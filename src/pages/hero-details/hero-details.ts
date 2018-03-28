import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { forkJoin } from "rxjs/observable/forkjoin";

import { Hero } from "../../interfaces/hero.interface";
import { MarvelProvider } from "../../providers/marvel/marvel";

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
    public navParams: NavParams
  ) {
    this.hero = this.navParams.get("hero");
    this.fetchComics();
  }

  fetchComics() {
    const sources = this.hero.comics.items.map(comic =>
      this.marvelProvider.fetchResource(comic.resourceURI)
    );

    forkJoin(sources).subscribe((comics: any) => {
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
