import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Priority } from "../priority";
import { PRIORITIES } from "../mock-priorities";

@Component({
  selector: 'app-priority-list',
  templateUrl: './priority-list.component.html',
  styleUrls: ['./priority-list.component.css']
})
export class PriorityListComponent implements OnInit {
      public priorities: Priority[] = PRIORITIES;

    public drop(event: CdkDragDrop<string[]>): number {
      moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);

      return event.currentIndex;
    }

  constructor() { }

  ngOnInit() {
  }

}
