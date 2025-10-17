import { Component, inject, OnInit } from '@angular/core';
import { ComboValues, Diary, DiaryFacade, PermissionsComponent } from '@workspace/shared/util-core';

@Component({
    selector: 'admin-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false,
})
export class DashboardComponent extends PermissionsComponent implements OnInit {
    diaryFacade = inject(DiaryFacade);

    diaries: Diary[] = [];
    block1Diaries: Diary[] = [];
    block2Diaries: Diary[] = [];
    block3Diaries: Diary[] = [];
    block4Diaries: Diary[] = [];
    block5Diaries: Diary[] = [];

    diaryTypes = ComboValues.DIARY_TYPES;

    tabIndex = 0;

    ngOnInit() {
        this.init();
    }

    async init() {
        if (this.isPermitted([this.Permissions.STUDENT.DIARY.LIST])) {
            this.diaries = await this.diaryFacade.list();
            this.formatDiaries();
        }
    }

    formatDiaries() {
        this.block1Diaries = this.diaries.filter((diary) => diary.Student && diary.Student.block === '1');
        this.block2Diaries = this.diaries.filter((diary) => diary.Student && diary.Student.block === '2');
        this.block3Diaries = this.diaries.filter((diary) => diary.Student && diary.Student.block === '3');
        this.block4Diaries = this.diaries.filter((diary) => diary.Student && diary.Student.block === '4');
        this.block5Diaries = this.diaries.filter((diary) => diary.Student && diary.Student.block === '5');
    }

    getType(type: number): string {
        const found = this.diaryTypes.find((dt) => dt.value === type);
        return found ? found.label : 'Desconocido';
    }
}
