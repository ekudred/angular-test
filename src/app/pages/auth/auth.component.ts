import { Component } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'

import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  constructor(private AuthService: AuthService) {}

  public form = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  })

  public signIn() {
    const username = this.form.controls['username'].value!
    const password = this.form.controls['password'].value!

    this.AuthService.signIn({ id: '123', username, password })
  }
}
