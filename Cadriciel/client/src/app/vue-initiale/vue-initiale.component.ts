import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-vue-initiale',
  templateUrl: './vue-initiale.component.html',
  styleUrls: ['./vue-initiale.component.css']
})
export class VueInitialeComponent implements OnInit {
  public readonly title: string = "Où déménagerez-vous???? ;)";
  constructor() { }

  ngOnInit() {
  
  }

}