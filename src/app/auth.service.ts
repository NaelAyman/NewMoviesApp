import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router
    ) {
      if(localStorage.getItem('userToken') != null) {
        this.saveCurrentUser();
      }
    }

  // currentUser = null;
  currentUser = new BehaviorSubject(null);

  saveCurrentUser() {
    let token:any = localStorage.getItem('userToken');
    // this.currentUser = jwtDecode(token);
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }

  register(formData: any): Observable<any> {
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup', formData);
  }

  login(formData: any): Observable<any> {
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin', formData);
  }

  logout() {
    this.currentUser.next(null);
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login']);
  }
}
