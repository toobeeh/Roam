import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  popularTV: Array<TvResult> = [];
  popularMovies: Array<MovieResult> = [];
  gridnav?: GridNav;

  constructor(public apiService: TmdbAPIService) {
  }

  async ngOnInit(): Promise<void> {
    let tvpop = await this.apiService.api.tvPopular();
    if(tvpop.results) this.popularTV = tvpop.results;

    let movpop = await this.apiService.api.moviePopular();
    if(movpop.results) this.popularMovies = movpop.results;

    /* start timeout after element add cooldown */
    setTimeout(()=>{
      this.gridnav = new GridNav("#homeGrid");
      this.gridnav.overflowLeft = GridNav.navGrid;
      if(GridNav.navGrid) {
        GridNav.navGrid.overflowRight = this.gridnav;
        GridNav.navGrid.stop();
      }

      this.gridnav.listen();
    },100);
  }

  ngOnDestroy(): void {
    this.gridnav!.stop();
    GridNav.navGrid!.overflowRight = undefined;
    GridNav.navGrid!.listen();
  }

}
