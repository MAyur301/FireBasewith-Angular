import { Task } from './../../Model/Task';
import { AfterViewInit, Component, EventEmitter, Input, ViewChild } from '@angular/core';
import { Output } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements AfterViewInit {

  @Output()
  CloseForm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  EmitTaskdata: EventEmitter<Task> = new EventEmitter<Task>();

   @Input() isEditmode:boolean =false;
   @Input() selectedTask:Task | undefined = undefined;

   @ViewChild('taskForm')taskForm!:NgForm;

  OnCloseForm(){
    this.CloseForm.emit(false);
  }
  OnFormSubmitted(taskForm:NgForm)
  {
      this.EmitTaskdata.emit(taskForm.value);
      this.CloseForm.emit(false);
      

  }
 ngAfterViewInit(): void {
  setTimeout(() => {
    this.taskForm.form.patchValue(this.selectedTask!)
  },0);

 }
}
