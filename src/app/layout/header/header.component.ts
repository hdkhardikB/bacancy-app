import { Component, NgZone } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  constructor(private account: AccountService,
    private router: Router,
    private zone: NgZone) {

  }

  /**
   * Signs out the user.
   */
  signOutUser() {
    this.account.logoutUser();
    this.zone.run(() => { // Change the property within the zone, CD will run after
      this.router.navigate(['login']);
    });
  }
}
