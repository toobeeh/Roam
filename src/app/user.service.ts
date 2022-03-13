import { Injectable } from '@angular/core';

interface recent {
  id: string;
  season?: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addRecent(entry: recent){
    let recents = this.getRecents();
    recents = recents.filter(recent => {
      if(recent.id != entry.id) {
        if(!recent.season && !entry.season) return true;
        else return recent.season != entry.season;
      }
      else return false;
    });
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
