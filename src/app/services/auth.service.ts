import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminUserInterface } from '../model/AdminUser.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    apiKey = 'AIzaSyCk90DY9QtzxDgbCokKDjBAgnTrZDEiZgg';
    fireBaseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts';
    database = 'https://shorten-link-7768d-default-rtdb.firebaseio.com/'

    constructor(private http: HttpClient) {
        this.http = http;
    }

    login(email: string, password: string): Observable<AdminUserInterface> {
        return this.http
            .post<AdminUserInterface>(`${this.fireBaseUrl}:signInWithPassword?key=${this.apiKey}`,
        {
            "email": email,
            "password": password,
            "returnSecureToken":true
        });
    }

    // register(){
    //     return this.http.get<AdminUserInterface>(jsonData);
    // }

    
}