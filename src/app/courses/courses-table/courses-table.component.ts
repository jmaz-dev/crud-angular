import { MatSnackBar } from '@angular/material/snack-bar';
import { Component } from '@angular/core';
import { CursosService } from '../services/cursos.service';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  courses$: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions'];
  constructor(
    private coursesSrv: CursosService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.coursesSrv.getAllCourses();
  }

  onAdd() {
    this.router.navigate(['novo-curso'], { relativeTo: this.route });
  }

  onDelete(id: number) {
    this.coursesSrv.deleteById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.onSuccess();
      },
    });
  }

  onSuccess() {
    this._snackBar.open('Curso deletado com sucesso.', undefined, {
      duration: 3000,
    });
    window.location.reload();
  }
}
