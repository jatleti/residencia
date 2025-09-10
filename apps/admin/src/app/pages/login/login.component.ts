import { Component } from '@angular/core';
import { Config } from '@workspace/shared/util-core';

@Component({
    selector: 'workspace-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false,
})
export class LoginComponent {
    baseUrl = Config.baseUrl;
}
