import { Component, VERSION } from '@angular/core';
import { UserProfileService } from './core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  constructor(private userProfileService: UserProfileService) {}

  public get isLoggedIn(): boolean {
    return this.userProfileService.isLoggedIn;
  }
}
