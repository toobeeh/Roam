import { Component, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse, MovieResult } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  movieID!: number;
  playerURL: SafeResourceUrl = "";
  movie!: MovieResponse;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbAPIService, public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    (document.querySelector("h1") as HTMLElement).focus();
    this.activatedRoute.params.subscribe(async data => {
      this.movieID = Number(data["id"]);
      const info = await this.tmdbService.api.movieInfo(this.movieID);
      this.movie = info;
      this.playerURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.2embed.ru/embed/tmdb/movie?id=' + this.movie.id);
      //this.playerURL = 'https://www.2embed.ru/embed/tmdb/movie?id=' + this.movie.id;
    });
  }

}
