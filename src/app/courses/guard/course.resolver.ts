import { Course } from './../../shared/models/course/course';
import { Observable, of } from 'rxjs';
import { ResolveFn } from '@angular/router';
import { CursosService } from '../services/cursos.service';
import { inject } from '@angular/core';

export const courseResolver: ResolveFn<Observable<Course>> = (
  route,
  state,
  service: CursosService = inject(CursosService)
) => {
  if (route.params?.['id'] !== 'novo') {
    return service.getCourseById(route.params['id']);
  }
  return of({ _id: '', name: '', category: '' });
};
