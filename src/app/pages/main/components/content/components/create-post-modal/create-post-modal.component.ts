import { Component } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { Observable } from 'rxjs'

import { PostService } from '../../../../services/post.service'
import { ModalService } from '../../../../../../common/modules/modal/modal.service'
import { RequestStatus } from '../../../../../../utils/types'

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModalComponent {
  constructor(private PostService: PostService, private ModalService: ModalService) {
    this.createStatus = this.PostService.createStatus
  }

  public createStatus: Observable<RequestStatus>

  public form = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  })

  public createPost() {
    const title = this.form.controls['title'].value!
    const body = this.form.controls['body'].value!

    this.PostService.createPost({ title, body }).add(() => {
      this.ModalService.close('create-post')
    })
  }

  public onCloseModal() {
    this.form.reset()
  }
}
