import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieResult, ShowResponse, TvResult, TvSeasonResponse } from 'moviedb-promise/dist/request-types';

@Component({
  selector: 'app-title-card',
  templateUrl: './title-card.component.html',
  styleUrls: ['./title-card.component.css']
})
export class TitleCardComponent implements OnInit {

  @Input() type!: "movie" | "series";
  @Input() title!: ShowResponse | MovieResult;
  @Input() big: boolean = false;
  @Input() details: boolean = false;

  caption: string = "";
  date: string = "";
  rating: number = 0;

  constructor(public router: Router) {
  }

  alert = (x:any) => alert(x)

  ngOnInit(): void {
    const asTv = this.title as ShowResponse;
    const asMovie = this.title as MovieResult;

    if(this.details == true){
      this.caption = this.type == "movie" ? asMovie.title! : asTv.name!;
      this.date = this.type == "movie" ? asMovie.release_date! : asTv.first_air_date!;
      this.rating = asMovie.vote_average!;
    }
  }

}
