import { Directive, OnInit, OnDestroy, ElementRef, Input, Output, EventEmitter } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

export enum IntersectionStatus {
  InVisible = 'InVisible',
  Visible = 'Visible',
  Pending = 'Pending',
}

@Directive({ selector: '[appIntersectionObserver]' })
export class IntersectionObserverDirective implements OnInit, OnDestroy {
  constructor(private ref: ElementRef) {}

  @Input()
  public intersectionRootMargin: string = '0px'
  @Input()
  public intersectionRoot?: HTMLElement
  @Input()
  public intersectionThreshold?: number | number[]

  @Output()
  public visibilityChange = new EventEmitter<IntersectionStatus>()

  private destroy: any = new Subject<any>()

  public ngOnInit() {
    const element = this.ref.nativeElement
    const config = {
      root: this.intersectionRoot,
      rootMargin: this.intersectionRootMargin,
      threshold: this.intersectionThreshold,
    }

    this.fromIntersectionObserver(element, config)
      .pipe(takeUntil(this.destroy))
      .subscribe(status => {
        this.visibilityChange.emit(status)
      })
  }

  public ngOnDestroy() {
    this.destroy.next()
  }

  private async isVisible(element: HTMLElement) {
    return new Promise(resolve => {
      const observer = new IntersectionObserver(([entry]) => {
        resolve(entry.isIntersecting)
        observer.disconnect()
      })

      observer.observe(element)
    })
  }

  private fromIntersectionObserver(element: HTMLElement, config: IntersectionObserverInit) {
    return new Observable<IntersectionStatus>(subscriber => {
      const intersectionObserver = new IntersectionObserver(entries => {
        entries.forEach(async entry => {
          const isEntryVisible = await this.isVisible(entry.target as HTMLElement)

          if (isEntryVisible) {
            subscriber.next(IntersectionStatus.Visible)
          } else {
            subscriber.next(IntersectionStatus.InVisible)
          }
        })
      }, config)

      intersectionObserver.observe(element)

      return {
        unsubscribe() {
          intersectionObserver.disconnect()
        },
      }
    })
  }
}
