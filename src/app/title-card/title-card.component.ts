import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResult, TvResult } from 'moviedb-promise/dist/request-types';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent implements OnInit {

  @Input() title!: TvResult | MovieResult;
  @Input() big: boolean = false;
  @Input() details: boolean = false;

  caption: string = "";
  date: string = "";
  type: string = "";
  rating: number = 0;

  constructor(public router: Router) {
  }

  alert = (x:any) => alert(x)

  ngOnInit(): void {
    const asTv = this.title as TvResult;
    const asMovie = this.title as MovieResult;
    this.type = asTv.name?.length ? "Series" : "Movie";

    if(this.details == true){
      this.caption = asTv.name ? asTv.name : asMovie.title ? asMovie.title : "";
      this.date = asTv.first_air_date ? asTv.first_air_date : asMovie.release_date ? asMovie.release_date : "";
      this.rating = this.title.vote_average!;
    }
  }

}
