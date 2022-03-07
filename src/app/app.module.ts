import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TmdbAPIService } from './tmdb-api.service';
import { SearchComponent } from './search/search.component';
import { TitleCardComponent } from './title-card/title-card.component';
import { MovieComponent } from './movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    TitleCardComponent,
    MovieComponent
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
