import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Season } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class SeasonDataService {
    constructor(private http: HttpClient) {}

    // Season CRUD
    list(): Observable<Season[]> {
        return this.http.get<Season[]>(Endpoints.API + '/season');
    }

    get(id: string): Observable<Season> {
        return this.http.get<Season>(Endpoints.API + '/season/' + id);
    }

    add(season: Season): Observable<Season> {
        return this.http.post<Season>(Endpoints.API + '/season', { data: season });
    }

    set(season: Season): Observable<Season> {
        return this.http.patch<Season>(Endpoints.API + '/season/' + season.id, { data: season });
    }

    del(season: Season): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(Endpoints.API + '/season/' + season.id);
    }
}