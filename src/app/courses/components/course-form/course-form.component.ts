import { Course } from './../../../shared/models/course/course';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  @Input() course: Course | undefined;
  loading: boolean = false;
  categorias = ['Front-End', 'Back-End'];
  @Output() formValue = new EventEmitter();

  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      _id: [this.course?._id],
      name: [this.course?.name, Validators.required],
      category: [this.course?.category, Validators.required],
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.formValue.emit(this.form.value);
    } else {
      this.validaForm();
    }
  }

  clean() {
    this.form.reset();
  }

  validaForm() {
    Object.keys(this.form.controls).forEach((campo) => {
      const c = this.form.get(campo);

      if (c instanceof FormControl) {
        c.markAsTouched({ onlySelf: true });
      } else if (c instanceof FormGroup) {
        this.validaForm();
      }
    });
  }
}
