import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Function } from '../interfaces/functions.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FunctionsService {

  private baseUrl : string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getFunctions(): Observable<Function[]>{

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')
    

    const url = `${this.baseUrl }/function/functions/`
    return this.http.get<Function[]>(url, {headers:headers});
  }

  postFunction(data : any) {

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/function/functions/`
    return this.http.post<any>(url, data, {headers:headers});
  }

  deleteFunction(id:any){

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/function/functions/`
    return this.http.delete<any>(url+id, {headers:headers});
  }
}