import { Component, OnDestroy, OnInit, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieResponse, MovieResult } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {

  movieID!: number;
  playerURL: SafeResourceUrl = "";
  movie!: MovieResponse;
  cast?: string = "";
  genres?: string = "";
  navgrid!: GridNav;

  constructor(private activatedRoute: ActivatedRoute, private tmdbService: TmdbAPIService, public sanitizer: DomSanitizer, public us: UserService, private ts: Title) {  }

  ngOnInit(): void {

    /* get movie ID */
    this.activatedRoute.params.subscribe(async data => {

      /* init nav grid */
      this.navgrid = new GridNav("app-movie");
      GridNav.navGrid!.stop();
      GridNav.navGrid!.overflowRight = this.navgrid;
      this.navgrid.overflowLeft = GridNav.navGrid;
      this.navgrid.listen();

      /* load all movie details and properties */
      this.movieID = Number(data["id"]);
      const info = await this.tmdbService.api.movieInfo(this.movieID);
      this.movie = info;
      this.playerURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.2embed.ru/embed/tmdb/movie?id=' + this.movie.id);
      this.cast = (await this.tmdbService.api.movieCredits(this.movieID)).cast?.slice(0,4).map(c => c.name + " (" + c.character + ")").join(", ");
      this.genres = this.movie.genres?.map(g => g.name).join(", ");

      document.addEventListener("fullscreenchange", ()=>{
        this.navgrid.activeElement = this.navgrid.elements[0];
        this.navgrid.activeElement.focus();
      });

      document.querySelector("iframe")?.addEventListener("focus", (e)=>{
        setTimeout(()=>{
          location.href = (e.target as any).src;
        },500);
      });

      this.us.addRecent({id: this.movieID.toString(), type: "movie"});


      this.ts.setTitle(this.movie.title! + " | Roam");
    });
  }

  ngOnDestroy(): void {
    this.navgrid.stop();
  }
}
