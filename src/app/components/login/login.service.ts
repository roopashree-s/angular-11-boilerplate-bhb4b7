import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { SpinnerService, UserProfileService } from '../../../app/core';

@Injectable()
export class LoginService {
  constructor(
    private spinnerService: SpinnerService,
    private userProfileService: UserProfileService
  ) {}

  login(username, password) {
    const users = [
      { userid: 'abc@media.com', password: 'abc123', username: 'tom' },
      { userid: 'def@media.com', password: 'def123', username: 'dick' }
    ];
    let user = users.find(
      u => u.password === password && u.username === username
    );
    this.spinnerService.show();
    if (user) {
      return of(user).pipe(
        delay(700),
        tap(x => this.toggleLogState(true))
      );
    }
    return throwError('Invalid user name');
    // .do(_ => this.spinnerService.show())
    // .delay(1000)
    // .do(this.toggleLogState.bind(this));
    // .do((val: boolean) => {
    //   this.isLoggedIn = true;
    //   console.log(this.isLoggedIn);
    // });
  }

  logout() {
    this.toggleLogState(false);
  }

  private toggleLogState(val: boolean) {
    this.userProfileService.isLoggedIn = val;
    this.spinnerService.hide();
  }
}
