import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator.service';
//import * as customValidators from 'src/app/shared/validators/validators';

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [ Validators.required, Validators.pattern(this.validatorsService.emailPattern)],[ new EmailValidator()] ],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]], // esto ayuda mas en el performance
    username: ['', [Validators.required, this.validatorsService.cantBeMoradev]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  },
    {
      validators: [
        this.validatorsService.isFieldOneEqualFieldTwo('password', 'confirmPassword')
      ]
    }
  );

  get emailError(): string {
    const email = this.myForm.get('email')
    if ( email!.getError('required') ) return 'El email es obligatorio'
    else if ( email!.getError('pattern') ) return 'El email debe tener un formato de correo'
    else if ( email!.getError('emailIsUsed') ) return 'El email ya está siendo usado por otro usuario'
    return ''
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: EmailValidator,
  ) { }

  isValidField(field: string) {
    return this.validatorsService.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
