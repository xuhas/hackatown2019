import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Priority } from "../priority";
import { PRIORITIES } from "../mock-priorities";
import { Preferences } from '../preferences';

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent implements OnInit {
      public priorities: Priority[] = PRIORITIES;


    public drop(event: CdkDragDrop<string[]>): void {
      moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
      console.log(this.priorities);

    }

    public myFunc(): void {
      let Pref = new Preferences(this.priorities.findIndex(i => i.nom === "Transport"), 
                                this.priorities.findIndex(i => i.nom === "Santé"),
                                this.priorities.findIndex(i => i.nom === "Santé"),
                                this.priorities.findIndex(i => i.nom === "Santé"),
                                this.priorities.findIndex(i => i.nom === "Commerces"),
                                this.priorities.findIndex(i => i.nom === "Commerces"),
                                this.priorities.findIndex(i => i.nom === "Commerces"),
                                this.priorities.findIndex(i => i.nom === "Éducation"),
                                this.priorities.findIndex(i => i.nom === "Éducation"),
                                this.priorities.findIndex(i => i.nom === "Éducation"));
      JSON.stringify(Pref);
            
    }
  



  constructor() { }

  ngOnInit() {
  }

}
