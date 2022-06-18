import { Component, Input } from '@angular/core'

import { ModalService } from '../../../../../../common/modules/modal/modal.service'
import { PostModel } from '../../../../models/post.model'
import { EditPostModalService } from '../edit-post-modal/edit-post-modal.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(private ModalService: ModalService, private EditPostModalService: EditPostModalService) {}

  @Input()
  public post!: PostModel

  public openModal() {
    const { id, title, body } = this.post

    this.EditPostModalService.setPostID(id)
    this.EditPostModalService.setInitialValues({ title, body })
    this.ModalService.open('edit-post')
  }
}
