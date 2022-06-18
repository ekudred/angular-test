import { Component, ElementRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core'

import { ModalService } from './modal.service'

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private ModalService: ModalService, private ref: ElementRef) {
    this.element = ref.nativeElement
  }

  @Input()
  public id!: string

  @Output()
  public closeModal: EventEmitter<any> = new EventEmitter()

  private element: any

  public ngOnInit() {
    if (!this.id) {
      console.error('Modal must have an id')
      return
    }

    this.element.style.display = 'none'

    this.element.addEventListener('click', (element: any) => {
      if (element.target.className === 'app-modal-wrapper') {
        this.close()
      }
    })

    this.ModalService.add(this)
  }

  public ngOnDestroy() {
    this.ModalService.remove(this.id)
    this.element.remove()
  }

  public open() {
    this.element.style.display = 'block'
  }

  public close() {
    this.element.style.display = 'none'

    this.closeModal.emit()
  }
}
