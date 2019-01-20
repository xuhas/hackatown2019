import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BasicService } from "./basic.service";
import { HttpClientModule } from "@angular/common/http";
import { VueInitialeComponent } from './vue-initiale/vue-initiale.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PriorityListComponent } from './priority-list/priority-list.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';






@NgModule({
  declarations: [
    AppComponent,
    VueInitialeComponent,
    PriorityListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCheckboxModule,
    DragDropModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    MatToolbarModule,
  ],
  providers: [BasicService],
  bootstrap: [AppComponent],
})
export class AppModule { }
