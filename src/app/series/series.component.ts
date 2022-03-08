import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResponse, ShowResponse } from 'moviedb-promise/dist/request-types';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  seriesID!: number;
  series!: ShowResponse;
  cast?: string = "";
  genres?: string = "";

  constructor(private activatedRoute: ActivatedRoute, public router: Router, private tmdbService: TmdbAPIService) { }

  ngOnInit(): void {
    (document.querySelector("h1") as HTMLElement).focus();
    this.activatedRoute.params.subscribe(async data => {
      this.seriesID = Number(data["id"]);
      const info = await this.tmdbService.api.tvInfo(this.seriesID);
      //info.seasons[0].ep;
      this.series = info;
      this.cast = (await this.tmdbService.api.tvCredits(this.seriesID)).cast?.slice(0,4).map(c => c.name + " (" + c.character + ")").join(", ");
      this.genres = this.series.genres?.map(g => g.name).join(", ");
    });
  }

}
