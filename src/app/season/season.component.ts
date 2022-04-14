import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowResponse, TvSeasonResponse } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit, OnDestroy {

  seriesID!: number;
  seasonID!: number;
  playerURL: SafeResourceUrl = "";
  season!: TvSeasonResponse;
  series!: ShowResponse;
  cast?: string = "";
  navgrid!: GridNav;

  constructor(private activatedRoute: ActivatedRoute, public router: Router, private tmdbService: TmdbAPIService, public sanitizer: DomSanitizer, private ts: Title) { }

  ngOnInit(): void {
    (document.querySelector("h1") as HTMLElement).focus();
    this.activatedRoute.params.subscribe(async data => {

      this.seriesID = Number(data["seriesid"]);
      this.seasonID = Number(data["seasonid"]);

      const tvinfo = await this.tmdbService.api.tvInfo(this.seriesID);
      const info = await this.tmdbService.api.seasonInfo({season_number: this.seasonID, id: this.seriesID});
      info;
      this.series = tvinfo;
      this.season = info;
      this.cast = (await this.tmdbService.api.seasonCredits({season_number: this.seasonID!, id: this.seriesID})).cast?.slice(0,4).map(c => c.name + " (" + c.character + ")").join(", ");

       /* init nav grid */
       this.navgrid = new GridNav("app-season");
       GridNav.navGrid!.stop();
       GridNav.navGrid!.overflowRight = this.navgrid;
       this.navgrid.overflowLeft = GridNav.navGrid;
       this.navgrid.listen();

       this.ts.setTitle(this.series.name! + " S" + this.seasonID + " | Roam");
    });
  }

  ngOnDestroy(): void {
    this.navgrid.stop();
  }
}
