import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../Model/Task';
import { Subject, catchError, map, throwError } from 'rxjs';
import { LoggiService } from './Logging.service';
@Injectable({
  providedIn: 'root',
})
export class Taskservice {
  allTask: Task[] = [];
  http: HttpClient = inject(HttpClient);
  loggiservice: LoggiService = inject(LoggiService);
  errorsubject = new Subject<HttpErrorResponse>();

  CreateTaskOrupdate(task: Task) {
    const headers = new HttpHeaders({ myheader: 'helloworld' });
    this.http
      .post<{ name: string }>(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json',
        task,
        { headers: headers },
        
      )
      .pipe(
        catchError((err) => {
          const errobj = {
            statuscode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggiservice.LogError(errobj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorsubject.next(err);
        },
      });
  }
  DeleteTask(id: string | undefined) {
    this.http
      .delete(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        catchError((err) => {
          const errobj = {
            statuscode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggiservice.LogError(errobj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorsubject.next(err);
        },
      });
  }
  DeleteAllTask() {
    this.http
      .delete(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json'
      )
      .subscribe({
        error: (err) => {
          this.errorsubject.next(err);
        },
      });
  }

  GetAllTask() {
    return this.http
      .get<{ [key: string]: Task }>(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((response) => {
          //TransForm Data
          let tasks = [];
          for (let key in response) {
            if (response.hasOwnProperty(key)) {
              tasks.push({ ...response[key], id: key });
            }
          }
          return tasks;
        }),
        catchError((err) => {
          //Write a logic to log errors
          const errorObje = {
            statuscode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggiservice.LogError(errorObje);
          return throwError(() => err);
        })
      );
  }

  updateTask(id: string | undefined, data: Task) {
    this.http
      .put(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json',
        data
      )
      .pipe(
        catchError((err) => {
          const errobj = {
            statuscode: err.status,
            errorMessage: err.message,
            datetime: new Date(),
          };
          this.loggiservice.LogError(errobj);
          return throwError(() => err);
        })
      )
      .subscribe({
        error: (err) => {
          this.errorsubject.next(err);
        },
      });
  }

  getTaskDetails(id: string | undefined) {
   return this.http
      .get(
        'https://angularhttpclient-d5e3f-default-rtdb.firebaseio.com/tasks/' +
          id +
          '.json'
      )
      .pipe(
        map((response) => {
          console.log(response);
          let task = {};
          task = {...response, id: id };
          return task;
        })
      )
  }
}
