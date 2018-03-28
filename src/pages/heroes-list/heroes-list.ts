import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { finalize } from "rxjs/operators";

import { Hero } from "../../interfaces/hero.interface";
import { MarvelProvider } from "../../providers/marvel/marvel";

@IonicPage()
@Component({
  selector: "page-heroes-list",
  templateUrl: "heroes-list.html"
})
export class HeroesListPage {
  attribution: string;
  heroesList: Hero[];
  limit: number;
  offset: number = 0;

  constructor(
    public marvelProvider: MarvelProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.limit = this.marvelProvider.CHARACTER_LIST_LIMIT;

    this.marvelProvider.fetchCharacters().subscribe((res: any) => {
      this.heroesList = res.data.results;
      this.attribution = res.attributionHTML;
    });
  }

  doInfinite(infiniteScroll) {
    this.offset = this.offset + this.limit;

    this.marvelProvider
      .fetchCharacters(this.offset)
      .pipe(
        finalize(() => {
          infiniteScroll.complete();
        })
      )
      .subscribe((res: any) => {
        res.data.results.forEach(hero => {
          this.heroesList.push(hero);
        });
      });
  }
}
