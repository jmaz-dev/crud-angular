import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './containers/courses/courses.component';
import { EditCourseComponent } from './containers/edit-course/edit-course.component';
import { courseResolver } from './guard/course.resolver';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
  },
  {
    path: 'editar/:id',
    component: EditCourseComponent,
    resolve: { course: courseResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
