import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Observable, take } from 'rxjs'

import { EditPostModalService } from './edit-post-modal.service'
import { ModalService } from '../../../../../../common/modules/modal/modal.service'
import { PostService } from '../../../../services/post.service'
import { RequestStatus } from '../../../../../../utils/types'

export interface Fields {
  title: string
  body: string
}

@Component({
  selector: 'app-edit-post-modal',
  templateUrl: './edit-post-modal.component.html',
  styleUrls: ['./edit-post-modal.component.scss'],
})
export class EditPostModalComponent implements OnInit {
  constructor(
    private EditPostModalService: EditPostModalService,
    private PostService: PostService,
    private ModalService: ModalService
  ) {
    this.updateStatus = this.PostService.updateStatus
    this.deleteStatus = this.PostService.deleteStatus

    this.initialValues = this.EditPostModalService.initialValues
  }

  public updateStatus: Observable<RequestStatus>
  public deleteStatus: Observable<RequestStatus>

  public initialValues: Observable<Fields>

  public form = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  })

  public ngOnInit() {
    this.initialValues.subscribe(fields => {
      const { title, body } = fields

      this.form.setValue({ title, body })
    })
  }

  public editPost() {
    const { title, body } = this.form.controls

    this.EditPostModalService.editPost({ title: title.value!, body: body.value! }).add(() => {
      this.ModalService.close('edit-post')
    })
  }

  public deletePost() {
    this.EditPostModalService.deletePost().add(() => {
      this.ModalService.close('edit-post')
    })
  }

  public onCloseModal() {
    this.form.reset()
    this.EditPostModalService.setPostID(null)
    this.EditPostModalService.initialValues.next({ title: '', body: '' })
  }
}
