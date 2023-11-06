import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, tap, delay, catchError, of } from 'rxjs';
import { ToastErrorComponent } from 'src/app/shared/components/toast/ToastError/ToastError.component';
import { Course } from '../../shared/models/course/course';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private httpClient: HttpClient, private toast: MatSnackBar) {}

  private readonly API = '/api/courses';

  private onError() {
    this.toast.openFromComponent(ToastErrorComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  getAllCourses() {
    return this.httpClient.get<Course[]>(`${this.API}`).pipe(
      delay(0),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of([]);
      })
    );
  }

  addNewCourse(req: Partial<Course>) {
    return this.httpClient.post<Course>(`${this.API}`, req).pipe(
      first(),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of(err);
      })
    );
  }

  deleteById(id: number) {
    return this.httpClient.delete<string>(`${this.API}/delete/${id}`).pipe(
      first(),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of(err);
      })
    );
  }
}
