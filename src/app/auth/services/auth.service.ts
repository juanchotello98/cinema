import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl : string = environment.baseUrl
  private _usuario : any = {}; 

  get usuario () {
    return {...this._usuario}
  }

  constructor( private http: HttpClient) { }

  login(data: any){

    const url = `${this.baseUrl }/login/`;

    return this.http.post<any>(url, data)
    .pipe(
      tap( res => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('name',res.user.name);
        localStorage.setItem('username',res.user.username);
        localStorage.setItem('email',res.user.email);
        this._usuario = {
          token : res.token,
          name: res.user.name,
          username : res.user.username,
          email: res.user.email,
          message: res.message,
        }
      }),
      map (res => res),
      catchError (err  => of(err.error.error))
    );
    
  }

  logout(){

    const url = `${this.baseUrl }/logout/`;

    let token = localStorage.getItem('token')

    let data = {'token':token}

    return this.http.post<any>(url, data)
    .subscribe({
      next:(res) => {
        localStorage.clear()
      },
      error:(err) => {
        console.log(err.error)
      } 
    })
  }

  refreshToken () {
    const url = `${this.baseUrl }/refresh-token/`;
    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    return this.http.get<any>(url, { headers:headers })
    .pipe(
      map( res => {
        localStorage.setItem('token',res.token);
        localStorage.setItem('name',res.user.name);
        localStorage.setItem('username',res.user.username);
        localStorage.setItem('email',res.user.email);
        this._usuario = {
          token : res.token,
          name: res.user.name,
          username : res.user.username,
          email: res.user.email,
          message: res.message,
        }
        return true; 
      }),
      catchError (err  => of(false))
    )
  }
}
