import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TmdbApiService {

  baseUrl = 'https://api.themoviedb.org/3/';

  options = {
    api_key: 'e2d4e870db2c0efaf52304958cdd2c12',
    language: 'pt-BR'
  }

  constructor() { }
}
