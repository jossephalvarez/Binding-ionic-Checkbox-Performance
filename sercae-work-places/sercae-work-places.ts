import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {UsuarioProvider} from "../../providers/usuario/user";
import {SercaeProvider} from "../../providers/sercae/sercae";

@IonicPage()
@Component({
  selector: 'page-sercae-work-places',
  templateUrl: 'sercae-work-places.html',
})
export class SercaeWorkPlacesPage {

  idCountry: any;
  sercaeLocations: SercaeLocation[] = [];
  sercaeLocationsChecked: SercaeLocation[] = [];
  sercaeCountries: SercaeCountry[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _us: UsuarioProvider, private _sp: SercaeProvider, private events: Events) {
  }

  ionViewWillEnter() {
    // this.menu.enable(false);
    if (!localStorage.getItem("ts") || localStorage.getItem("ts") === null || localStorage.getItem("ts") === "") {
      this.navCtrl.setRoot('Login').then(() => {
        this._us.remove_Storage();
      })
    } else {
      this.idCountry = this.navParams.get('idCountry');
      this.sercaeCountries = this.navParams.get('SercaeCountries');

      let currentCountry = this.sercaeCountries.find(o => o.sid === this.idCountry);

      console.log("CurrentCountry");
      console.log(currentCountry);

      //to passidCountry for the next request

      console.log("SercaeCountries" + this.sercaeCountries);

      this._sp.getSercaeLocations().subscribe((locations: SercaeLocation[]) => {
        locations.forEach(res => {
          if (currentCountry.workPlaces.length > 0) {
            let c = currentCountry.workPlaces.find(c => c.id_worker === res.id_worker);
            console.log("C");
            console.log(c);
            if(c){
              res['checked'] = 'true';
              this.sercaeLocationsChecked.push(c);
            }else{
              res['checked'] = 'false';
            }
          }

        });
        this.sercaeLocations = locations;

        console.log(this.sercaeLocations);
      }, error => console.log(error))
    }
  }

  updatedWorkPlaces(ansindex, value, checked) {
    if (checked) {
      let obj = this.sercaeLocationsChecked.find(o => o.workplace.id_workplace === value.workplace.id_workplace);

      if (!obj)
        this.sercaeLocationsChecked.push(value);
    } else {
      this.sercaeLocationsChecked = this.sercaeLocationsChecked.filter(o => o.workplace.id_workplace != value.workplace.id_workplace);
    }
  }

  submitWorkPlaces() {
    console.log("ESTOS SON LAS LOCALZIACIONES CHEKEADAS");
    console.log(this.sercaeLocationsChecked);
    console.log("COUNTRY" + this.idCountry);
    this.sercaeCountries.forEach(s => {
      if (s.sid === this.idCountry) {
        s.workPlaces = this.sercaeLocationsChecked;
      }
    });

    console.log("NUEVOOO JSON");
    console.log(this.sercaeCountries);

    this.navCtrl.pop().then(() => {
      this.events.publish('sercaeLocationsChecked', this.sercaeLocationsChecked);
      this.events.publish('sercaeCountriesChecked', this.sercaeCountries);
    });
  }
}
