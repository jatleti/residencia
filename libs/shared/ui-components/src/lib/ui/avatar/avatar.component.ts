import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Endpoints, User } from '@workspace/shared/util-core';

@Component({
    selector: 'components-avatar',
    imports: [CommonModule],
    template: `
        <ng-container *ngIf="user">
            <div
                *ngIf="user.photo && user.photo !== ''; else noPhoto"
                class="flex items-center w-[35px] h-[35px] rounded-full overflow-hidden"
            >
                <img src="{{ user.photo }}" class="w-[35px]" />
            </div>
            <ng-template #noPhoto>
                <div
                    class="flex items-center rounded-full w-[35px] h-[35px] font-bold justify-center text-white bg-[var(--color-500)]"
                >
                    {{ initials }}
                </div>
            </ng-template>
        </ng-container>
    `,
    styles: [],
})
export class AvatarComponent implements OnInit {
    @Input() user!: User;

    bgColor = '';
    initials = '';

    API_PUBLIC_URL = Endpoints.PUBLIC_API;

    ngOnInit() {
        if (this.user) {
            this.initials = this.getInitials(this.user);
            this.bgColor = this.stringToColorCode(this.initials);
        }
    }

    stringToColorCode(str: string) {
        if (str == '' || !str) {
            return '';
        }
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }

        const h = hash % 360;
        return 'hsl(' + h + ', 65%, 60%)';
    }

    getInitials(person: User): string {
        let initials = '';
        if (person.name) {
            initials += person.name.charAt(0);
        }
        if (person.surname) {
            initials += person.surname.charAt(0);
        }
        return initials;
    }
}
