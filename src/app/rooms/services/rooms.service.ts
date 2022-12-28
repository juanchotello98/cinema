import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Room } from '../interfaces/rooms.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  private baseUrl : string = environment.baseUrl

  constructor(private http: HttpClient) { }

  getRooms(): Observable<Room[]>{

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/room/rooms/`
    return this.http.get<Room[]>(url, {headers:headers})
  }

  postRoom(data : any) {

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/room/rooms/`
    return this.http.post<any>(url, data, {headers:headers});
  }

  deleteRoom(id:any){

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/room/rooms/`
    return this.http.delete<any>(url+id, {headers:headers})
  }

}
