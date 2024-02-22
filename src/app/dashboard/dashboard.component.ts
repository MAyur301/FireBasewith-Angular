import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Taskservice } from '../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit,OnDestroy{

  http: HttpClient = inject(HttpClient);
  taskservice:Taskservice = inject(Taskservice);
  showCreateTaskForm: boolean = false;
  editMode:boolean = false;
  selectedTasks:Task | undefined = undefined;
  allTask:Task[]=[]
  currentTaskId:string | undefined ='';
  isLoading:boolean=false;
  errormeassgae: string | null=null;
  showTaskdeatils:boolean=false;

  errsub:Subscription | null=null;

  currentTask:Task | null=null;
  ngOnInit(): void {
    this.featchAllTask();
   this.errsub = this.taskservice.errorsubject.subscribe({next:(httpError) => {
      this.setErrorMessage(httpError);
    }})

  }
  OpenCreateTaskForm() {
    this.showCreateTaskForm = true;
    this.editMode=false;
    this.selectedTasks =  {title:'',desc:'',assignedTo:'',createdAt:'',priority:'',status:'',id:''}
  }

  CloseCreateTaskForm() {
    this.showCreateTaskForm = false;
  }

  FetchAllTaskClicked()
  {
    this.featchAllTask();
  }
  createTaskorupdate(data: Task) {

        if(!this.editMode)
        {
          this.taskservice.CreateTaskOrupdate(data);
        }
        else
        {
           //edit task
           this.taskservice.updateTask(this.currentTaskId,data);
        }
    }
  private featchAllTask() {

     this.isLoading=true;
     this.taskservice.GetAllTask().subscribe({next:(tasks) => {
      this.allTask=tasks;
      this.isLoading=false;
     },error:(error) => {
    this.setErrorMessage(error);
     this.isLoading=false;
     }})
  }

  private setErrorMessage(err:HttpErrorResponse)
  {
     if(err.error.error === 'Permission denied')
     {
        this.errormeassgae = 'Permission denied'
     }
     else
     {
       this.errormeassgae = err.message;
     }
     setTimeout(() => {
      this.errormeassgae=null;
     }, 3000);
  }
  DeleteTask(id:string)
  {
       this.taskservice.DeleteTask(id);
  }

  DeleteAllTask()
  {
      this.taskservice.DeleteAllTask();
  }
  onEditTaskClicked(id:string | undefined)
  {
          this.currentTaskId = id;
           //Open edit Form;
           this.showCreateTaskForm=true;
           this.editMode = true;

           this.selectedTasks =this.allTask.find((task) => {
           return task.id === id
           })
  }
  showdeatis(id:string | undefined)
  {
    this.showTaskdeatils = true;
    this.taskservice.getTaskDetails(id).subscribe({next:(data:any) => {
     this.currentTask=data;
    }});
  }
  onCloseTaskDetail() {
        this.showTaskdeatils = false;
  }

 ngOnDestroy(): void {
   this.errsub?.unsubscribe();
 }


}
