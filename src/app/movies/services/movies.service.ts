import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Movie } from '../interfaces/movies.interfaces';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private baseUrl : string = environment.baseUrl

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]>{

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/movie/movies/`
    return this.http.get<Movie[]>(url,{headers:headers})
  }

  postMovie(data : any) {

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/movie/movies/`
    return this.http.post<any>(url, data, {headers:headers});
  }

  deleteMovie(id:any){

    const headers = new HttpHeaders()
    .set('Authorization', 'Token '+ localStorage.getItem('token') || '')

    const url = `${this.baseUrl }/movie/movies/`
    return this.http.delete<any>(url+id, {headers:headers})
  }
}
