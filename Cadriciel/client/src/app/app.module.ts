import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { VueResultatComponent } from './vue-resultat/vue-resultat.component';

import { AgmCoreModule } from '@agm/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';
//import { NavigationComponent } from './navigation/navigation.component';
import { VueInitialeComponent } from './vue-initiale/vue-initiale.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PriorityListComponent } from './priority-list/priority-list.component';
import {MatMenuModule} from '@angular/material/menu';

import {MatExpansionModule} from '@angular/material/expansion';


@NgModule({
  declarations: [
    AppComponent,
    VueResultatComponent,
    
    
    VueInitialeComponent,
    PriorityListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxcHfQjPdYG-ivhf6HnxKGax2hHiFRryU 	'
    }),
    BrowserAnimationsModule,
    [CommonModule,MatToolbarModule,MatExpansionModule,MatButtonModule,DragDropModule,MatMenuModule,MatButtonModule,MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule,MatCheckboxModule,]
    
    
    
    
    
    
  ],
  exports: [CommonModule,MatButtonModule, MatToolbarModule, MatNativeDateModule, MatIconModule, MatSidenavModule, MatListModule],
  providers: [BasicService],
  bootstrap: [AppComponent],
})
export class AppModule { }
