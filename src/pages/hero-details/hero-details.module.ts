import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HeroDetailsPage } from './hero-details';

@NgModule({
  declarations: [
    HeroDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(HeroDetailsPage),
  ],
})
export class HeroDetailsPageModule {}
