import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TmdbAPIService } from './tmdb-api.service';
import { SearchComponent } from './search/search.component';
import { TitleCardComponent } from './title-card/title-card.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { SeasonComponent } from './season/season.component';
import { EpisodeComponent } from './episode/episode.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    TitleCardComponent,
    MovieComponent,
    SeriesComponent,
    SeasonComponent,
    EpisodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    TmdbAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
