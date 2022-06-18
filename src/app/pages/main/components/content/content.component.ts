import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { PostService } from '../../services/post.service'
import { PostModel } from '../../models/post.model'
import { RequestStatus } from '../../../../utils/types'
import { ModalService } from '../../../../common/modules/modal/modal.service'
import { IntersectionStatus } from '../../../../common/directives/intersection-observer.directive'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  constructor(private PostService: PostService, private ModalService: ModalService) {
    this.posts = this.PostService.posts
    this.findStatus = this.PostService.findStatus
  }

  public readonly limitPosts: number = 20

  public posts: Observable<PostModel[]>
  public findStatus: Observable<RequestStatus>

  public ngOnInit() {
    this.PostService.findPosts({ start: 0, limit: this.limitPosts })
  }

  public openCreatePostModal() {
    this.ModalService.open('create-post')
  }

  public visibilityChangeExtra(status: IntersectionStatus) {
    if (status === 'Visible') {
      const lengthAllPosts = this.PostService.lengthAllPosts.getValue()
      const start = this.PostService.posts.getValue().length

      if (lengthAllPosts !== start) {
        this.PostService.findPosts({ start, limit: this.limitPosts })
      }
    }
  }
}
