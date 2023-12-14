import { ActivatedRoute } from '@angular/router';
import { ToastSuccessComponent } from './../../../shared/components/toast/ToastSuccess/ToastSuccess.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from './../../services/cursos.service';
import { Component } from '@angular/core';
import { Course } from 'src/app/shared/models/course/course';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css'],
})
export class EditCourseComponent {
  id: string | null = this.route.snapshot.paramMap.get('id');
  courseSnap: Course;
  constructor(
    private toast: MatSnackBar,
    private courseSrv: CursosService,
    private route: ActivatedRoute
  ) {
    this.courseSnap = route.snapshot.data['course'];
  }

  onSubmit(form: Course) {
    // console.log(form);
    this.courseSrv.saveCourse(form).subscribe({
      next: (res) => {
        if (res.status !== 400) {
          this.onSuccess();
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      },
    });
  }

  onSuccess() {
    this.toast.openFromComponent(ToastSuccessComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }
}
