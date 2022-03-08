import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowResponse, TvResult, TvSeasonRequest, TvSeasonResponse } from 'moviedb-promise/dist/request-types';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  seriesID!: number;
  seasonID!: number;
  playerURL: SafeResourceUrl = "";
  season!: TvSeasonResponse;
  series!: ShowResponse;
  cast?: string = "";

  constructor(private activatedRoute: ActivatedRoute, public router: Router, private tmdbService: TmdbAPIService, public sanitizer: DomSanitizer) { }

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
    });
  }

}
