import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error: string = '';

  loginForm = new UntypedFormGroup({
    email: new UntypedFormControl(null,
      [
        Validators.email,
        Validators.required
      ]),
    password: new UntypedFormControl(null,
      [
        Validators.required,
        Validators.pattern('^[A-Z][a-z0-9]{3,8}$')
      ])
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) { }

  ngOnInit(): void {
  }

  submitLoginForm(loginForm: UntypedFormGroup) {
    this._AuthService.login(loginForm.value).subscribe( (response) => {
      if (response.message == 'success') {
        localStorage.setItem('userToken', response.token);
        this._AuthService.saveCurrentUser();
        this._Router.navigate(['/home']);
      }
      else {
        this.error = response.message;
      }
    });
  }

}
