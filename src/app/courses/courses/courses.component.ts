import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CursosService } from '../services/cursos.service';
import { Course } from '../interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];

  constructor(
    private coursesSrv: CursosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesSrv.getAllCourses().pipe(
      tap((res) => {
        _snackBar.open('Cursos carregados ', undefined, { duration: 3000 });
      }),
      catchError((err) => {
        console.error(err.message);
        _snackBar.open('Ocorreu um erro: ' + err.status, undefined, {
          duration: 3000,
        });
        return of([]);
      })
    );
  }

  ngOnInit(): void {}
  onAdd() {
    this.router.navigate(['novo-curso'], { relativeTo: this.route });
  }
}
