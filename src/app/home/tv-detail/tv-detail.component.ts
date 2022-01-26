import { TmdbApiService } from './../../core/services/tmdb-api/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MovieTvBase } from 'src/app/core/models/movie-tv-base';

@Component({
  selector: 'app-tv-detail',
  templateUrl: './tv-detail.component.html',
  styleUrls: ['./tv-detail.component.scss']
})
export class TvDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private tmdbApi: TmdbApiService
  ) { }

  detail$!: Observable<MovieTvBase>;

  ngOnInit(): void {
    const id: number = this.route.snapshot.params['id'];
    this.detail$ = this.tmdbApi.getDetailById(id, 'tv')
  }

}
