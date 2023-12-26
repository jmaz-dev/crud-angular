import { Injectable } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUtilsService {
  // get error message formGroup
  getErrorMessage(formGroup: UntypedFormGroup, fieldName: string) {
    const field = formGroup.get(`${fieldName}`) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }
  // get error message formArray
  getFormArrayFieldErrorMessage(
    formGroup: UntypedFormGroup,
    formArrayName: string,
    fieldName: string,
    index: number
  ) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    const field = formArray.controls[index].get(
      fieldName
    ) as UntypedFormControl;
    return this.getErrorMessageFromField(field);
  }

  getErrorMessageFromField(field: UntypedFormControl) {
    if (field?.hasError('required')) {
      return '* Campo obrigatório!';
    }
    if (field?.hasError('maxlength')) {
      const maxLength: number = field?.errors
        ? // retorna o valor estipulado no validator
          field.errors['maxlength']['requiredLength']
        : 100;

      return `* Máximo ${maxLength} caracteres.`;
    }
    if (field?.hasError('minlength')) {
      const minLength: number = field?.errors
        ? // retorna o valor estipulado no validator
          field.errors['minlength']['requiredLength']
        : 5;

      return `* Mínimo ${minLength} caracteres.`;
    }
    return 'Campo Inválido';
  }

  isFormArrayRequired(formGroup: UntypedFormGroup, formArrayName: string) {
    const formArray = formGroup.get(formArrayName) as UntypedFormArray;
    return formArray.invalid && formArray.touched;
  }

  validateAllFormField(formGroup: UntypedFormGroup | UntypedFormArray) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);

      if (control instanceof UntypedFormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (
        control instanceof UntypedFormArray ||
        control instanceof UntypedFormGroup
      ) {
        control.markAsTouched({ onlySelf: true });
        this.validateAllFormField(control);
      }
    });
  }
}
