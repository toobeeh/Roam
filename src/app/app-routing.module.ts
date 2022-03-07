import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },{
    path: "search",
    component: SearchComponent
  },{
    path: "movie/:id",
    component: MovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
