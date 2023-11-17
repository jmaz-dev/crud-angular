import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './containers/courses/courses.component';
import { SharedModule } from '../shared/shared.module';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { EditCourseComponent } from './containers/edit-course/edit-course.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseFormComponent,
    CoursesTableComponent,
    EditCourseComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class CoursesModule {}
