import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieResult, TvResult, TvSeasonResponse } from 'moviedb-promise/dist/request-types';
import { GridNav } from '../grid-nav';
import { TmdbAPIService } from '../tmdb-api.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recents',
  templateUrl: './recents.component.html',
  styleUrls: ['./recents.component.css']
})
export class RecentsComponent implements OnInit, OnDestroy {

  resultsAll: Array<TvSeasonResponse | MovieResult> = [];
  gridnav?: GridNav;

  constructor(private tmdbApi: TmdbAPIService, private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {

    /* load recents */
    const recents = this.userService.getRecents().slice(0,50);
    for(let recent of recents){
      if(recent.season) this.resultsAll.push(await this.tmdbApi.api.seasonInfo({season_number: recent.season, id: recent.id}));
      else this.resultsAll.push(await this.tmdbApi.api.movieInfo(recent.id));
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

