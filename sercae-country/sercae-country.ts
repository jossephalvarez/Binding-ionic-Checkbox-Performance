import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {SercaeWorkPlacesPage} from "../sercae-work-places/sercae-work-places";
import {UsuarioProvider} from "../../providers/usuario/user";

@IonicPage()
@Component({
  selector: 'page-sercae-country',
  templateUrl: 'sercae-country.html',
})
export class SercaeCountryPage {

  sercaeLocations: SercaeLocation[] = [];
  sercaeLocationsChecked: SercaeLocation[] = [];
  showPanel: boolean = false;

  SercaeCountries = [
    {
      sid: 'España',
      workPlaces: []
    },
    {
      sid: 'Italia',
      workPlaces: []
    }, {
      sid: 'Alemania',
      workPlaces: []
    }, {
      sid: 'Perú',
      workPlaces: []
    }, {
      sid: 'Brasil',
      workPlaces: []
    }, {
      sid: 'Chile',
      workPlaces: []
    },
  ];
  sercaeCountriesChecked: SercaeCountry[] = [];
  controlSubmit: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _us: UsuarioProvider, private events: Events) {

    if (!localStorage.getItem("ts") || localStorage.getItem("ts") === null || localStorage.getItem("ts") === "") {
      this.navCtrl.setRoot('Login').then(() => {
        this._us.remove_Storage();
      })
    } else {
      this.events.subscribe('sercaeLocationsChecked', (locations: SercaeLocation[]) => {
        this.sercaeLocationsChecked = locations;
      });
      this.events.subscribe('sercaeCountriesChecked', (countries: SercaeCountry[]) => {
        this.sercaeCountriesChecked = countries;
        this.checkSubmit();
      });
      console.log("SercaeLocationsChecked");
      console.log(this.sercaeLocationsChecked);
      console.log("sercaeCountriesChecked");
      console.log(this.sercaeCountriesChecked);

      console.log("CONTROL" + this.controlSubmit)
    }
  }

  ionViewWillEnter() {
    //alert("ionViewWillEnter");
    // this.menu.enable(false);
  }

  checkSubmit() {
    console.log("checkSubmit2")
    this.sercaeCountriesChecked.forEach(r => {
      if (r.workPlaces.length > 0) {
        this.controlSubmit = true;
        return;
      }
    })
  }

  goToCountry(idCountry) {
    this.navCtrl.push(SercaeWorkPlacesPage, {'idCountry': idCountry, 'SercaeCountries': this.SercaeCountries});
  }

  submitCountry() {
    this.showPanel = true;
  }
}
