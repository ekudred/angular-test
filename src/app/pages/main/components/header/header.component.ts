import { Component } from '@angular/core'

import { AuthService } from '../../../auth/auth.service'
import { PostService } from '../../services/post.service'
import { Observable } from 'rxjs'
import { UserModel } from '../../../../models/user.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private AuthService: AuthService, private PostService: PostService) {
    this.user = this.AuthService.user
  }

  public user: Observable<UserModel | null>

  public signOut() {
    this.AuthService.signOut()

    // this.PostService.posts.unsubscribe()
    this.PostService.posts.next([])
  }
}
