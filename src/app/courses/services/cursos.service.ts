import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, tap, delay, catchError, of, map } from 'rxjs';
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
      first(),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of([]);
      })
    );
  }

  saveCourse(req: Partial<Course>) {
    debugger;
    console.log(req);
    if (req._id) {
      return this.update(req);
    } else {
      return this.new(req);
    }
  }

  deleteById(id: number) {
    return this.httpClient.delete<number>(`${this.API}/delete/${id}`).pipe(
      first(),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of(err);
      })
    );
  }

  getCourseById(id: string | null) {
    return this.httpClient
      .get<Course>(`${this.API}/buscarPorId/${id}`)
      .pipe(first());
  }

  private new(req: Partial<Course>) {
    return this.httpClient.post<Course>(`${this.API}`, req).pipe(
      first(),
      catchError((err) => {
        console.error(err.message);
        this.onError();
        return of(err);
      })
    );
  }
  private update(req: Partial<Course>) {
    return this.httpClient
      .put<Course>(`${this.API}/edit/${req._id}`, req)
      .pipe(first());
  }
}
