import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CursosService } from '../services/cursos.service';
import { Course } from '../interfaces/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category'];

  constructor(
    private coursesSrv: CursosService,
    private _snackBar: MatSnackBar
  ) {
    this.courses$ = this.coursesSrv.getAllCourses().pipe(
      catchError((err) => {
        console.error(err.message);
        _snackBar.open('Ocorreu um erro: ' + err.status, undefined, {
          duration: 3000,
        });
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.listCourses();
  }
  listCourses() {}
}
