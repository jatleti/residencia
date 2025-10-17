import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Diary } from '../entities/schema';
import { DiaryDataService } from '../infrastructure/diary.data.service';

@Injectable({ providedIn: 'root' })
export class DiaryFacade {
    constructor(private diaryDataService: DiaryDataService) {}

    async list(): Promise<Diary[]> {
        return await firstValueFrom(this.diaryDataService.list());
    }
}
