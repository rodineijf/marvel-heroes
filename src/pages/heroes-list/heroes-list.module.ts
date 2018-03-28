import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroesListPage } from './heroes-list';

@NgModule({
  declarations: [
    HeroesListPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroesListPage),
  ],
})
export class HeroesListPageModule {}
