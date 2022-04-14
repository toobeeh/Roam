import { Injectable } from '@angular/core';

interface recent {
  id: string;
  type: "movie" | "series";
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addRecent(entry: recent){
    let recents = this.getRecents();

    /* remove if present */
    recents = recents.filter(recent => !(recent.type == entry.type && recent.id == entry.id));

    /* add on top */
    recents.unshift(entry);
    this.setRecents(recents);
  }

  getRecents(){
    const recents: Array<recent> = JSON.parse(localStorage.getItem("recents") + "");
    return recents ? recents : [];
  }

  setRecents(recents: Array<recent>){
    localStorage.setItem("recents", JSON.stringify(recents));
  }


}
