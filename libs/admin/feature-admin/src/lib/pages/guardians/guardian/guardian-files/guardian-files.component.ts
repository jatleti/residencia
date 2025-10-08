import { Component, inject, Input, OnInit } from '@angular/core';
import {
    PermissionsComponent,
    Student,
    StudentFacade,
    Endpoints,
    Guardian,
    File,
    GuardianFacade,
} from '@workspace/shared/util-core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FileBeforeUploadEvent } from 'primeng/fileupload';

@Component({
    selector: 'admin-guardian-files',
    standalone: false,
    templateUrl: './guardian-files.component.html',
    styleUrl: './guardian-files.component.scss',
})
export class GuardianFilesComponent extends PermissionsComponent implements OnInit {
    @Input() guardian!: Guardian;
    guardianFacade = inject(GuardianFacade);
    messageService = inject(MessageService);
    confirmationService = inject(ConfirmationService);

    API_UPLOAD_URL = Endpoints.API + '/storage/upload/file';

    newFile: File = <File>{};
    files: File[] = [];

    ngOnInit() {
        if (this.guardian && this.guardian.Files) {
            this.files = this.guardian.Files;
        }
    }

    onUploadFile(event: any) {
        this.newFile.url = event.originalEvent.body.file;
        this.newFile.name = event.originalEvent.body.name;
    }

    onBeforeUploadFile($event: FileBeforeUploadEvent) {
        $event.formData.append('path', 'files');
    }

    async addFile() {
        if (!this.newFile.url || this.newFile.url === '') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falta el fichero' });
            return;
        }
        this.files = await this.guardianFacade.addFile(this.guardian.id, this.newFile);
        this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Fichero añadido' });
        this.newFile = <File>{};
    }

    async getFile(file: File) {
        if (!this.guardian || !this.guardian.id) return;

        const f = await this.guardianFacade.getFile(this.guardian.id, file.id);
        if (f && f.url) {
            window.open(f.url, '_blank');
        }
    }

    async deleteFile(file: File) {
        this.confirmationService.confirm({
            message: '¿Seguro que quieres eliminar este fichero?',
            header: 'Confirmación',
            icon: 'pi pi-exclamation-triangle',
            accept: async () => {
                this.files = await this.guardianFacade.delFile(this.guardian.id, file.id);
                this.messageService.add({ severity: 'success', summary: 'OK', detail: 'Fichero eliminado' });
            },
        });
    }
}
