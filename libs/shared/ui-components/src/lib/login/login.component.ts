import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { AuthFacade, Config, LocalStorageService, SharedUtilCoreModule } from '@workspace/shared/util-core';

@Component({
    selector: 'components-login',
    standalone: true,
    imports: [
        CommonModule,
        MessageModule,
        SharedUtilCoreModule,
        InputTextModule,
        ButtonModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginFromComponent implements OnInit {
    authFacade = inject(AuthFacade);
    router = inject(Router);
    fb = inject(FormBuilder);
    messageService = inject(MessageService);
    localStorageFactory = inject(LocalStorageService);

    error$ = this.authFacade.errorLoginSubject$;

    formGroup!: FormGroup;

    sendLogin = false;
    magicLink = false;
    magicLinkSend = false;
    magicLinkSending = false;
    email = '';
    errorLink = '';

    secure2FA = false;
    secure2FASend = false;
    secure2FASending = false;
    secure2FACode: string[] = ['', '', '', '', '', ''];
    secure2FAError = '';

    @Input() redirectOk = 'admin';

    ngOnInit(): void {
        this.sendLogin = false;
        this.initForm();
    }

    async login() {
        this.authFacade.errorLoginSubject.next({});

        if (this.formGroup.valid) {
            const email = this.formGroup.get('email')?.value;
            const password = this.formGroup.get('password')?.value;

            this.sendLogin = true;

            try {
                const session = await this.authFacade.login(email, password);
                if (!session.mode && session.token) {
                    this.router.navigate([this.redirectOk]);
                } else {
                    this.secure2FA = true;
                    setTimeout(() => {
                        this.focusNextAvailableInput();
                    }, 250);
                }
            } catch (e: any) {
                console.log(e);
            }

            this.sendLogin = false;
        } else {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Rellena bien los campos',
            });
        }
    }

    initForm(): void {
        const emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

        this.formGroup = this.fb.group({
            email: ['', [Validators.required, Validators.email, Validators.pattern(emailPattern)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    isValid(field: string) {
        if (this.formGroup.get(field)?.touched) {
            return this.formGroup.get(field)?.invalid;
        } else {
            return true;
        }
    }

    errorMessage(field: string) {
        if (this.formGroup.get(field)?.touched) {
            const error = this.formGroup.get(field)?.errors;
            if (error?.['required']) {
                return 'El campo es requerido';
            } else if (error?.['pattern']) {
                return 'El campo no parece tener el formato correcto';
            } else if (error?.['email']) {
                return 'El campo debe ser un email';
            } else if (error?.['minlength']) {
                const minLength = error?.['minlength'].requiredLength;
                return `El campo debe tener al menos ${minLength} caracteres`;
            }
            return '';
        } else {
            return '';
        }
    }

    async sendMagicLink() {
        this.errorLink = '';
        this.magicLinkSend = false;
        if (!this.email || this.email === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Rellena bien los campos',
            });
            this.errorLink = 'Rellena bien el email';
            return;
        }

        if (this.email) {
            this.magicLinkSending = true;
            try {
                const session = await this.authFacade.magicLink(this.email);
                if (session && session.status === 200) {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Email enviado',
                        detail: 'Hemos enviado un email a tu cuenta con un enlace mágico para acceder a la plataforma',
                    });
                    this.magicLinkSend = true;
                }
                this.magicLinkSending = false;
                this.email = '';
            } catch (e: any) {
                console.log(e);
                this.errorLink = e.error.error.message;
                this.magicLinkSending = false;
            }
        }
    }

    async validate2FACode() {
        this.secure2FAError = '';
        this.secure2FASend = false;

        const code = this.secure2FACode.join('');

        if (!code || code === '') {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Rellena bien el código',
            });
            this.secure2FAError = 'Rellena bien el código';
            return;
        }

        this.secure2FASending = true;
        try {
            const response = await this.authFacade.validate2FACode(code);
            if (response && response.status !== 200) {
                this.secure2FAError = response.message;
                setTimeout(() => {
                    this.focusNextAvailableInput();
                }, 250);
            }
            if (response && response.status === 200) {
                if (response) {
                    this.localStorageFactory.setLocalStorage(Config.localUserToken, response.token);
                    this.localStorageFactory.setLocalStorage(Config.localUserRefreshToken, response.refreshToken);
                }
                this.router.navigate([Config.baseUrl]);
            }
            this.secure2FASending = false;
            this.secure2FACode = ['', '', '', '', '', ''];
        } catch (e: any) {
            console.log(e);
            this.secure2FAError = e.error.error.message;
            this.secure2FASending = false;
        }
    }

    onKeyup(event: KeyboardEvent, index: number): void {
        const input = event.target as HTMLInputElement; // Cast to HTMLInputElement
        if (input.value && index < 5) {
            // Assure that nextElementSibling is an input element
            const nextInput = input.nextElementSibling as HTMLInputElement;
            if (nextInput && nextInput.type === 'text') {
                nextInput.focus();
            }
        }
    }

    onPaste(event: ClipboardEvent, index: number): void {
        event.preventDefault();
        const clipboardData = event.clipboardData?.getData('text') || '';
        const pasteData = clipboardData.split('');
        for (let i = 0; i < pasteData.length; i++) {
            if (index + i < 6) {
                this.secure2FACode[index + i] = pasteData[i];
            }
        }
        event.stopPropagation();
    }

    focusNextAvailableInput(): void {
        const inputs = document.querySelectorAll('input');
        const emptyInput = Array.from(inputs).find((input) => input.value === '');
        if (emptyInput) {
            (emptyInput as HTMLInputElement).focus();
        }
    }
}
