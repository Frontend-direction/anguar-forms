import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {createPasswordStrengthValidator} from "../validators/passwordStrength.validator";


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent {
  form = this.fb.group({
    email: ['',{
      validators:  [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['',[ Validators.required,Validators.minLength(8),createPasswordStrengthValidator()] ]
  })


  constructor(
    private fb: FormBuilder,
  ) {}

  get email(): AbstractControl {
    return this.form.controls['email'];
  }

  get password(): AbstractControl {
    return this.form.controls['password'];
  }

}
