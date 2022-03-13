import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EpisodeComponent } from './episode/episode.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { RecentsComponent } from './recents/recents.component';
import { SearchComponent } from './search/search.component';
import { SeasonComponent } from './season/season.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path: "search",
    component: SearchComponent
  },{
    path: "recent",
    component: RecentsComponent
  },{
    path: "movie/:id",
    component: MovieComponent
  },{
    path: "series/:id",
    component: SeriesComponent
  },{
    path: "series/:seriesid/season/:seasonid",
    component: SeasonComponent
  },{
    path: "series/:seriesid/season/:seasonid/episode/:episodeid",
    component: EpisodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
