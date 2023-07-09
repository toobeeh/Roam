import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode, MovieResponse, ShowResponse, TvResult, TvSeasonResponse } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit, OnDestroy {

  episodeID!: number;
  seasonID!: number;
  seriesID!: number;
  playerURL: SafeResourceUrl = "";
  episode!: Episode;
  season!: TvSeasonResponse;
  series!: ShowResponse;
  cast?: string = "";
  navgrid!: GridNav;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, private tmdbService: TmdbAPIService, public sanitizer: DomSanitizer, private us: UserService, private ts: Title) { }

  ngOnInit(): void {

    /* get movie ID */
    this.activatedRoute.params.subscribe(async data => {

      /* init nav grid */
      this.navgrid = new GridNav("app-episode");
      GridNav.navGrid!.stop();
      GridNav.navGrid!.overflowRight = this.navgrid;
      this.navgrid.overflowLeft = GridNav.navGrid;
      this.navgrid.listen();

      /* load all movie details and properties */
      this.seriesID = Number(data["seriesid"]);
      this.seasonID = Number(data["seasonid"]);
      this.episodeID = Number(data["episodeid"]);

      this.series = await this.tmdbService.api.tvInfo(this.seriesID);
      this.season = await this.tmdbService.api.seasonInfo({ season_number: this.seasonID, id: this.seriesID });
      const epReq = { season_number: this.seasonID, episode_number: this.episodeID, id: this.seriesID };
      this.episode = await this.tmdbService.api.episodeInfo(epReq);

      this.playerURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://embed.smashystream.com/playere.php?tmdb=' + this.seriesID + "&season=" + this.seasonID + "&episode=" + this.episodeID
      );
      this.cast = (await this.tmdbService.api.episodeCredits(epReq)).cast?.slice(0, 4).map(c => c.name + " (" + c.character + ")").join(", ");

      document.addEventListener("fullscreenchange", () => {
        this.navgrid.activeElement = this.navgrid.elements[0];
        this.navgrid.activeElement.focus();
      });

      document.querySelector("iframe")?.addEventListener("focus", (e) => {
        setTimeout(() => {
          location.href = (e.target as any).src;
        }, 500);
      });

      this.us.addRecent({ id: this.seriesID.toString(), type: "series" });

      this.ts.setTitle(this.series.name! + " S" + this.seasonID + "E" + this.episodeID + " | Roam");
    });
  }

  ngOnDestroy(): void {
    this.navgrid.stop();
  }
}

