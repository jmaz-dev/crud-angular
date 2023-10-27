import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, tap, delay } from 'rxjs';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private httpClient: HttpClient) {}

  private readonly API = '/api/courses';

  getAllCourses() {
    return this.httpClient.get<Course[]>(`${this.API}`).pipe(
      first(),
      delay(0),
      tap((res) => console.log(res))
    );
  }
}
