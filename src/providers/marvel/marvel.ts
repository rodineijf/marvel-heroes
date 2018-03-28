import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import * as md5 from "md5";
import * as moment from "moment";
import { take } from "rxjs/operators";

import { Environment } from "../../environments/environment";
import { Hero } from "../../interfaces/hero.interface";

@Injectable()
export class MarvelProvider {
  CHARACTER_LIST_LIMIT = 15;

  constructor(public http: HttpClient) {}

  fetchCharacters(offset: number = 0, nameStartsWith: string = null) {
    const params: any = {
      ...this._authorization,
      limit: this.CHARACTER_LIST_LIMIT + "",
      offset: offset + ""
    };

    if (nameStartsWith) {
      params.nameStartsWith = nameStartsWith;
    }

    return this.http
      .get<Hero>("https://gateway.marvel.com:443/v1/public/characters", {
        params
      })
      .pipe(take(1));
  }

  fetchResource(resourceUri: string) {
    return this.http
      .get<any>(resourceUri, {
        params: { ...this._authorization }
      })
      .pipe(take(1));
  }

  private get _authorization() {
    const ts = moment().format("X");

    return {
      apikey: Environment.API_KEY,
      hash: md5(ts + Environment.PRIVATE_KEY + Environment.API_KEY),
      ts
    };
  }
}
