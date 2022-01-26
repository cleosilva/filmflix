import { map, Observable } from 'rxjs';
import { MovieTvBase } from './../../models/movie-tv-base';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type ApiResponse = { page: number, results: MovieTvBase[] }

@Injectable({
  providedIn: 'root'
})


export class TmdbApiService {

  baseUrl = 'https://api.themoviedb.org/3';

  options = {
    api_key: 'e2d4e870db2c0efaf52304958cdd2c12',
    language: 'pt-BR'
  }

  constructor( private http: HttpClient) { }

  trending(): Observable<MovieTvBase[]>{
    return this.http.get<ApiResponse>(`${this.baseUrl}/trending/all/week`, {
      params: this.options
    }).pipe(map(data => data.results))
  }

  search( query: string): Observable<MovieTvBase[]> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/search/multi`, {
      params: {
        ...this.options,
        include_adult: false,
        query: query,
      }
    }).pipe(map(data => data.results));
  }

  getDetailById(id: number, type: 'movie' | 'tv'): Observable<MovieTvBase>{
    return this.http.get<MovieTvBase>(`${this.baseUrl}/${type}/${id}`, {
      params: this.options,
    })
  }
}
