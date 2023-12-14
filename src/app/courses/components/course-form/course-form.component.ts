import { Course } from './../../../shared/models/course/course';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Lesson } from 'src/app/shared/models/lessons/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  @Input() course: Course | undefined;
  loading: boolean = false;
  categorias = ['Front-end', 'Back-end'];
  @Output() formValue = new EventEmitter();
  onShow: boolean = false;
  displayedColumns: string[] = ['id', 'name', 'link'];
  dataSource: any;
  constructor(private formBuilder: NonNullableFormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  retrieveLessons(course: Course | undefined) {
    const lessons = [];

    if (course?.lessons?.length) {
      course.lessons.forEach((lesson) =>
        lessons.push(this.createLesson(lesson))
      );
    } else {
      lessons.push(this.createLesson());
    }
    return lessons;
  }

  createLesson(lesson: Lesson = { id: '', name: '', link: '' }) {
    return this.formBuilder.group({
      id: [lesson.id],
      name: [lesson.name, Validators.required],
      link: [lesson.link, Validators.required],
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;

    lessons.push(this.createLesson());
  }
  createForm() {
    this.form = this.formBuilder.group({
      _id: [this.course?._id],
      name: [
        this.course?.name,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      category: [
        this.course?.category,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ],
      ],
      lessons: this.formBuilder.array(this.retrieveLessons(this.course)),
    });

    this.dataSource = new MatTableDataSource(this.course?.lessons);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);
      return this.formValue.emit(this.form.value);
    }
    return this.validaForm();
  }

  clean() {
    this.form.reset();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(`${fieldName}`);

    if (field?.hasError('required')) {
      return '* Campo obrigatório!';
    }
    if (field?.hasError('maxlength')) {
      const maxLength: number = field?.errors
        ? field.errors['maxlength']['requiredLength']
        : 100;

      return `* Máximo ${maxLength} caracteres.`;
    }
    if (field?.hasError('minlength')) {
      const minLength: number = field?.errors
        ? field.errors['minlength']['requiredLength']
        : 5;

      return `* Mínimo ${minLength} caracteres.`;
    }
    return 'Campo Inválido';
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
