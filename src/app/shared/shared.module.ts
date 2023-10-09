import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [CategoryPipe],
  imports: [CommonModule, AppMaterialModule],
  exports: [AppMaterialModule, CategoryPipe],
})
export class SharedModule {}
