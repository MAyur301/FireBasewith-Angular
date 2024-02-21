import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from "@angular/core";
import { Task } from '../Model/Task';
import { map } from 'rxjs';
@Injectable({
  providedIn:'root'
})
export  class Taskservice
{
    allTask:Task[]=[]
     http:HttpClient =  inject(HttpClient);

     CreateTask(task:Task)
     {
      const headers = new HttpHeaders({ myheader: 'helloworld' });
      this.http
        .post<{ name: string }>(
          'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json',
          task,
          { headers: headers }
        )
        .subscribe((response) => {
          console.log(response);
          //this.featchAllTask();
        });
     }
     DeleteTask(id:string | undefined)
     {
      this.http.delete('https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks/'+id+'.json').subscribe((e) => {
        console.log(e);
        //this.featchAllTask();
       })
     }
     DeleteAllTask()
     {
        this.http.delete('https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json').subscribe((e) => {
        console.log(e);
       // this.featchAllTask();
       })

     }

     GetAllTask()
     {
      return this.http
      .get<{ [key: string]: Task }>(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(map((response) => {
        //TransForm Data
        let tasks=[];
        for(let key in response)
        {
           if(response.hasOwnProperty(key))
           {
            tasks.push({...response[key],id:key})
           }
        }
        return tasks;
      }))
     }
}
