import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../../../shared/models/course/course';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss'],
})
export class CoursesTableComponent {
  readonly displayedColumns = ['name', 'category', 'actions'];
  @Input() courses: Course[] = [];
  @Output() add = new EventEmitter(false);
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  onAdd() {
    this.add.emit(true);
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
  onEdit(id: string) {
    this.edit.emit(id);
  }
}
