import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../infrastructure/endpoints';
import { CustomResponse } from '../entities/customresponse';
import { Invoice } from '../entities/schema';

@Injectable({ providedIn: 'root' })
export class InvoiceDataService {
    constructor(private http: HttpClient) {}

    // Invoice CRUD
    list(): Observable<Invoice[]> {
        return this.http.get<Invoice[]>(Endpoints.API + '/invoice');
    }

    get(id: string): Observable<Invoice> {
        return this.http.get<Invoice>(Endpoints.API + '/invoice/' + id);
    }

    add(invoice: Invoice): Observable<Invoice> {
        return this.http.post<Invoice>(Endpoints.API + '/invoice', { data: invoice });
    }

    set(invoice: Invoice): Observable<Invoice> {
        return this.http.patch<Invoice>(Endpoints.API + '/invoice/' + invoice.id, { data: invoice });
    }

    del(invoice: Invoice): Observable<CustomResponse> {
        return this.http.delete<CustomResponse>(Endpoints.API + '/invoice/' + invoice.id);
    }
}
