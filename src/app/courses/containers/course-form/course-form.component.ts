import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  form = this.formBuilder.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
  });
  loading: boolean = false;
  categorias = ['Front-End', 'Back-End'];

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: NonNullableFormBuilder,
    private courseSrv: CursosService
  ) {}

  clean() {
    this.form.reset();
  }
  onSubmit() {
    this.courseSrv.addNewCourse(this.form.value).subscribe({
      complete: () => {
        this.clean();
        this.onSuccess();
      },
      error: (err) => this.onError(err),
    });
  }
  onError(err: any) {
    this._snackBar.open('Ocorreu um erro: ' + err.status, undefined, {
      duration: 3000,
    });
  }
  onSuccess() {
    this._snackBar.open('Curso adicionado com sucesso.', undefined, {
      duration: 3000,
    });
  }
}
