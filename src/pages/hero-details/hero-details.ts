import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { forkJoin } from "rxjs/observable/forkjoin";
import { finalize } from "rxjs/operators";

import { Hero } from "../../interfaces/hero.interface";
import { MarvelProvider } from "../../providers/marvel/marvel";
import { UiHelperProvider } from "../../providers/ui-helper/ui-helper";

@IonicPage()
@Component({
  selector: "page-hero-details",
  templateUrl: "hero-details.html"
})
export class HeroDetailsPage {
  hero: Hero;
  comics: any;

  constructor(
    public marvelProvider: MarvelProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public ui: UiHelperProvider
  ) {
    this.hero = this.navParams.get("hero");
    this.fetchComics();
  }

  fetchComics() {
    this.ui.showLoading();

    const sources = this.hero.comics.items.map(comic =>
      this.marvelProvider.fetchResource(comic.resourceURI)
    );

    forkJoin(sources)
      .pipe(
        finalize(() => {
          this.ui.hideLoading();
        })
      )
      .subscribe((comics: any) => {
        this.comics = comics.map(comic => {
          const thumbnail = comic.data.results[0].thumbnail;
          return {
            title: comic.data.results[0].title,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`
          };
        });
      });
  }
}
