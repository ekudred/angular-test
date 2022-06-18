import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Router } from '@angular/router'

import { UserModel } from '../../models/user.model'

interface SignInOptions {
  id: string
  username: string
  password: string
}

interface RefreshOptions {
  id: string
  username: string
  password: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null)

  constructor(private router: Router) {}

  public signIn(options: SignInOptions) {
    const { id, username, password } = options

    localStorage.setItem('id', id)
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    this.user.next({ id, username, password })

    this.router.navigate([''])
  }

  public signOut() {
    localStorage.removeItem('id')
    localStorage.removeItem('username')
    localStorage.removeItem('password')

    this.user.next(null)

    this.router.navigateByUrl('/auth')
  }

  public refresh(options: RefreshOptions) {
    const { id, username, password } = options

    this.user.next({ id, username, password })
  }
}
