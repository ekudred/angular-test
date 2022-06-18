import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

import { PostService } from '../../../../services/post.service'
import { Fields } from './edit-post-modal.component'

@Injectable({ providedIn: 'root' })
export class EditPostModalService {
  constructor(private PostService: PostService) {}

  public postID: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  public initialValues: BehaviorSubject<Fields> = new BehaviorSubject<Fields>({ title: '', body: '' })

  public setPostID(postID: string | null) {
    this.postID.next(postID)
  }

  public setInitialValues(values: Fields) {
    this.initialValues.next(values)
  }

  public editPost(values: Fields) {
    const postID = this.postID.getValue()!
    const { title, body } = values

    return this.PostService.updatePost({ postID, title, body })
  }

  public deletePost() {
    const postID = this.postID.getValue()!

    return this.PostService.deletePost({ postID })
  }
}
