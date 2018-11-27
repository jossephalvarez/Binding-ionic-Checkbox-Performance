import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SercaeCountryPage } from './sercae-country';
import {SercaeWorkPlacesPageModule} from "../sercae-work-places/sercae-work-places.module";

@NgModule({
  declarations: [
    SercaeCountryPage,
  ],
  imports: [
    IonicPageModule.forChild(SercaeCountryPage),
    SercaeWorkPlacesPageModule
  ],
})
export class SercaeCountryPageModule {}
