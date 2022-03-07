import { Injectable } from '@angular/core';
import { MovieDb } from "moviedb-promise";

@Injectable({
  providedIn: 'root'
})
export class TmdbAPIService {

  api: MovieDb;

  constructor() {

    this.api = new MovieDb("c84c6b1c7c4478db070b7e8c61f48c2a");
  }
}
