import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public loading?: boolean = false
  @Input()
  public disabled?: boolean = false
  @Input()
  public fill?: 'blue' | 'red' = 'blue'

  @Output()
  public clickButton: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>()
}
