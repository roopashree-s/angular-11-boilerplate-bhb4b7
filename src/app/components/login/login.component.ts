import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { UserProfileService } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnDestroy {
  private loginSub: Subscription;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  errorMsg = '';
  user = {};

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router,
    private userProfileService: UserProfileService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.loginSub = this.loginService
      .login(this.f.username.value, this.f.password.value)
      .subscribe(
        user => {
          console.log(`Successfully logged in`);
          this.user = user;
          if (this.userProfileService.isLoggedIn) {
            let url = ['/gallery'];
            this.router.navigate(url);
          }
        },
        error => {
          // this.alertService.error(error);
          this.errorMsg = error;
          this.loading = false;
        }
      );
  }

  public get isLoggedIn(): boolean {
    return this.userProfileService.isLoggedIn;
  }

  login() {
    this.loginSub = this.loginService
      .login()
      // .mergeMap(loginResult => this.route.queryParams)
      // .map(qp => qp["redirectTo"])
      .subscribe(redirectTo => {
        console.log(`Successfully logged in`);
        if (this.userProfileService.isLoggedIn) {
          let url = redirectTo ? [redirectTo] : ['/gallery'];
          this.router.navigate(url);
        }
      });
  }

  logout() {
    this.loginService.logout();
    // console.log(`Successfully logged out`);
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
