import { Course } from './../../../shared/models/course/course';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  UntypedFormArray,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FormUtilsService } from 'src/app/shared/form/form-utils.service';
import { Lesson } from 'src/app/shared/models/lessons/lesson';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  form!: FormGroup;
  @Input() course: Course | undefined;
  @Output() formValue = new EventEmitter();
  loading: boolean = false;
  onShow: boolean = false;
  categorias = ['Front-end', 'Back-end'];
  displayedColumns: string[] = ['id', 'name', 'link'];
  dataSource: any;
  constructor(
    private formBuilder: NonNullableFormBuilder,
    public formUtils: FormUtilsService
  ) {}

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
      name: [
        lesson.name,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      link: [
        lesson.link,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
    });
  }

  getLessonsFormArray() {
    return (<UntypedFormArray>this.form.get('lessons')).controls;
  }
  addNewLesson() {
    const lessons = this.form.get('lessons') as UntypedFormArray;

    lessons.push(this.createLesson());
  }
  removeLesson(i: number) {
    const lessons = this.form.get('lessons') as UntypedFormArray;

    lessons.removeAt(i);
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
      lessons: this.formBuilder.array(this.retrieveLessons(this.course), [
        Validators.required,
      ]),
    });

    this.dataSource = new MatTableDataSource(this.course?.lessons);
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form);
      return this.formValue.emit(this.form.value);
    }
    console.log(this.form);

    return this.formUtils.validateAllFormField(this.form);
  }

  clean() {
    this.form.reset();
  }
}
