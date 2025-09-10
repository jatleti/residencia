import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AuthInterceptor, SharedUtilCoreModule } from '@workspace/shared/util-core';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { LoginFromComponent, MenuComponent } from '@workspace/shared/ui-components';
import { LoginComponent } from './pages/login/login.component';
import { MagicLinkComponent } from './pages/magic-link/magic-link.component';
import Aura from '@primeng/themes/aura';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import NoutlyTheme from '../assets/css/noutlyTheme';

@NgModule({
    declarations: [AppComponent, MainNavigationComponent, LoginComponent, MagicLinkComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SharedUtilCoreModule,
        RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
        ButtonModule,
        HttpClientModule,
        CardModule,
        ConfirmDialogModule,
        ToastModule,
        MenuComponent,
        LoginFromComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: NoutlyTheme,
                options: {
                    darkModeSelector: 'light',
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities',
                    },
                },
            },
        }),
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
