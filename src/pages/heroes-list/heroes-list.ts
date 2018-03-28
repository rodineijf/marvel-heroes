import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { finalize, switchMap } from "rxjs/operators";
import { Subject } from "rxjs/Subject";

import { Hero } from "../../interfaces/hero.interface";
import { MarvelProvider } from "../../providers/marvel/marvel";
import { UiHelperProvider } from "../../providers/ui-helper/ui-helper";

@IonicPage()
@Component({
  selector: "page-heroes-list",
  templateUrl: "heroes-list.html"
})
export class HeroesListPage {
  attribution: string;
  heroesList: Hero[];
  isSearching: boolean = false;
  limit: number;
  offset: number = 0;
  search: string;
  search$: Subject<String> = new Subject<string>();

  constructor(
    public marvelProvider: MarvelProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public ui: UiHelperProvider
  ) {
    this.limit = this.marvelProvider.CHARACTER_LIST_LIMIT;
    this.loadCharacters();
    this.watchSearch();
  }

  loadCharacters() {
    this.ui.showLoading();

    this.marvelProvider
      .fetchCharacters(this.offset, this.search)
      .pipe(
        finalize(() => {
          this.ui.hideLoading();
        })
      )
      .subscribe((res: any) => {
        this.heroesList = res.data.results;
        this.attribution = res.attributionHTML;
      });
  }

  cancelSearch() {
    this.offset = 0;
    if (this.search) {
      this.search = "";
      this.loadCharacters();
    }
    this.isSearching = false;
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

  doSearch(event) {
    this.search$.next(this.search);
  }

  watchSearch() {
    this.search$
      .pipe(
        switchMap(() => {
          return this.marvelProvider.fetchCharacters(this.offset, this.search);
        }),
        finalize(() => {})
      )
      .subscribe((res: any) => {
        this.heroesList = res.data.results;
      });
  }
}
