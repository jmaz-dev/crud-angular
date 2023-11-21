import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastSuccessComponent } from 'src/app/shared/components/toast/ToastSuccess/ToastSuccess.component';
import { Course } from '../../../shared/models/course/course';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;

  constructor(
    private coursesSrv: CursosService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: MatSnackBar
  ) {
    this.refresh();
  }

  refresh() {
    this.courses$ = this.coursesSrv.getAllCourses();
  }
  onAdd() {
    this.router.navigate(['editar/novo'], { relativeTo: this.route });
  }

  onDelete(id: string) {
    this.coursesSrv.deleteById(id).subscribe({
      next: () => {
        this.refresh();
        this.toast.openFromComponent(ToastSuccessComponent, {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
    });
  }

  onEdit(id: string) {
    this.router.navigate([`editar/${id}`], { relativeTo: this.route });
  }
}
