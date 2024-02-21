import { Component } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  OnCloseForm(){
    this.CloseForm.emit(false);
  }

}
