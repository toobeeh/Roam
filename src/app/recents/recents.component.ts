import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieResult, ShowResponse, TvResult, TvSeasonResponse } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.css']
})
export class RecentsComponent implements OnInit, OnDestroy {

  resultsAll: Array<{type: "movie" | "series", title: ShowResponse | MovieResult}> = [];
  gridnav?: GridNav;

  constructor(private tmdbApi: TmdbAPIService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {

    /* load recents */
    const recents = this.userService.getRecents().slice(0,50);
    for(let recent of recents){
      if(recent.type == "series") this.resultsAll.push({type: "series", title: await this.tmdbApi.api.tvInfo(recent.id)});
      else this.resultsAll.push({type: "movie", title: await this.tmdbApi.api.movieInfo(recent.id)});
    }

    /* start timeout after element add cooldown */
    setTimeout(()=>{
      this.gridnav = new GridNav("#recentsSection");
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

