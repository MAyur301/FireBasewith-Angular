import { Component, OnInit, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Taskservice } from '../services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  taskservice:Taskservice = inject(Taskservice);
  showCreateTaskForm: boolean = false;
  editMode:boolean = false;
  selectedTasks:Task | undefined = undefined;
  allTask:Task[]=[]
  ngOnInit(): void {
    this.featchAllTask();
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
  createTask(data: Task) {
         this.taskservice.CreateTask(data);
    }
  private featchAllTask() {

     this.taskservice.GetAllTask().subscribe((tasks) => {
     this.allTask=tasks;
    });
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
           //Open edit Form;
           this.showCreateTaskForm=true;
           this.editMode = true;

           this.selectedTasks =this.allTask.find((task) => {
           return task.id === id
           })
  }

  
}
