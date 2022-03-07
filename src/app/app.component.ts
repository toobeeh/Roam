import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GridNav } from './grid-nav';
import { TmdbAPIService } from './tmdb-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tmdb-streamer';

  constructor(public api: TmdbAPIService, public router: Router){}

  ngOnInit(): void {
    let sidenav = new GridNav("#sidenav");
    GridNav.navGrid = sidenav;
  }

}
