import { Component, OnInit } from '@angular/core'

import { AuthService } from './pages/auth/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private AuthService: AuthService) {}

  public ngOnInit() {
    if (!!localStorage.getItem('id')) {
      const id = localStorage.getItem('id')!
      const username = localStorage.getItem('username')!
      const password = localStorage.getItem('password')!

      this.AuthService.refresh({ id, username, password })
    }
  }
}
