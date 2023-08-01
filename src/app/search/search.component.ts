import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieResult, PersonResult, TvResult } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  resultsTv: Array<TvResult> = [];
  resultsMovie: Array<MovieResult> = [];
  resultsAll: Array<TvResult | MovieResult> = [];
  gridnav: GridNav;
  searchnav: GridNav;

  constructor(private tmdbApi: TmdbAPIService) {

    /* init series nav */
    this.gridnav = new GridNav("#searchResults");
    this.gridnav.overflowLeft = GridNav.navGrid;
    GridNav.navGrid!.overflowRight = this.gridnav;

    /* init search nav and connect with other navs*/
    this.searchnav = new GridNav("");
    this.searchnav.overflowBottom = this.gridnav;
    this.searchnav.overflowLeft = GridNav.navGrid;
    this.gridnav.overflowTop = this.searchnav;
  }

  ngOnInit(): void {

    /* stop nav grid */
    GridNav.navGrid?.stop();

    /* start search grid */
    this.searchnav.elements = [document.querySelector("app-search input") as HTMLElement];
    this.searchnav.activeElement = this.searchnav.elements[0];
    this.searchnav.activeElement.focus();
    this.searchnav.listen();
  }

  ngOnDestroy(): void {
    this.gridnav!.stop();
    GridNav.navGrid!.overflowRight = undefined;
    GridNav.navGrid!.listen();
  }

  thisSearch = 0;

  async search(text: string) {
    let search = this.thisSearch = Date.now();

    setTimeout(async () => {
      if (this.thisSearch != search) return;

      let searchTv = await this.tmdbApi.api.searchTv({ query: text });
      let searchMovie = await this.tmdbApi.api.searchMovie({ query: text });
      if (searchTv.results) this.resultsTv = searchTv.results.filter(res => res.poster_path);
      if (searchMovie.results) this.resultsMovie = searchMovie.results.filter(res => res.poster_path);

      this.resultsTv.forEach(r => r.media_type = "tv");

      this.resultsAll = [...this.resultsMovie, ...this.resultsTv].sort((a, b) => b.popularity! - a.popularity!);

      setTimeout(() => {
        this.gridnav?.refreshChildren();
        this.gridnav!.activeElement = this.gridnav!.elements[0];
      }, 100)
    }, 250);
  }

}
