import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MtxButtonModule } from '@ng-matero/extensions/button';
import { TranslateModule } from '@ngx-translate/core';

import { AuthService } from '@core/authentication';
import { AppwriteException } from 'appwrite';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ToastService } from '@shared/services/mat.toust.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MtxButtonModule,
    TranslateModule,
    MatProgressSpinnerModule,
  ],
})
export class AuthLoginComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);
  private readonly touachService = inject(ToastService);
  errorMessage='';
  isSubmitting = false;
  loginForm = this.fb.nonNullable.group({
    username: ['firist821@gmail.com', [Validators.required]],
    password: ['4@Z18nh9x', [Validators.required]],
    rememberMe: [false],
  });
  ngOnInit() {

    this.auth.logout();
  }

  get username() {
    return this.loginForm.get('username')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe')!;
  }

  async login() {
    this.errorMessage='';
    this.isSubmitting = true;
    const data = { email: this.username.value, password: this.password.value };
    try {
      await this.auth.login2(data);
    } catch (error) {
      this.isSubmitting = false;
      const err='خطأ بكلمة المرور واسم المستخدم';
      this.errorMessage=err;
      this.touachService.error(err,3000);
    }

    // this.auth

    // .login(this.username.value, this.password.value, this.rememberMe.value)
    // .pipe(filter(authenticated => authenticated))
    // .subscribe({
    //   next: () => {
    //     this.router.navigateByUrl('/');
    //   },
    //   error: (errorRes: HttpErrorResponse) => {
    //     if (errorRes.status === 422) {
    //       const form = this.loginForm;
    //       const errors = errorRes.error.errors;
    //       Object.keys(errors).forEach(key => {
    //         form.get(key === 'email' ? 'username' : key)?.setErrors({
    //           remote: errors[key][0],
    //         });
    //       });
    //     }
    //     this.isSubmitting = false;
    //   },
    // });
  }
}
