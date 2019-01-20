import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {

  private _jsonURL = 'assets/mock-data.json';
 constructor(private http: HttpClient) {
   this.getJSON().subscribe(data => {
    console.log(data);
   });
  }
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  ngOnInit() {
  }

}
