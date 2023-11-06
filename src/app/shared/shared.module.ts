import { ToastSuccessComponent } from './components/toast/ToastSuccess/ToastSuccess.component';
import { ToastErrorComponent } from './components/toast/ToastError/ToastError.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';
import { CategoryPipe } from './pipes/category.pipe';

@NgModule({
  declarations: [CategoryPipe, ToastErrorComponent, ToastSuccessComponent],
  imports: [CommonModule, AppMaterialModule],
  exports: [AppMaterialModule, CategoryPipe],
})
export class SharedModule {}
