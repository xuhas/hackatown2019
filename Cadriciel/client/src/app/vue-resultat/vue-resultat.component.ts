import { Component, OnInit } from '@angular/core';
//import { LocationComponent } from '../location/location.component';
import { Location } from '../location';
import { LOCATIONS } from '../mock-locations';

@Component({
  selector: 'app-vue-resultat',
  templateUrl: './vue-resultat.component.html',
  styleUrls: ['./vue-resultat.component.css']
})
export class VueResultatComponent implements OnInit {
  title: string = 'My first AGM project';
    
    markers : Location[] = LOCATIONS;
    selectedLocation:Location;
  constructor() { 
    //this.markers = LOCATIONS
  }

  ngOnInit() {
    console.log("here");
    console.log(this.markers);
    this.selectedLocation=this.markers[1];

  }
  onSelect(location: Location): void {
    this.selectedLocation = location;
    //document.getElementById("map");
  }

  //markerIconUrl() {
  //  return require('./favorite.png');
  //}

}
