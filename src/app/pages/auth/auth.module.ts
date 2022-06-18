import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AuthComponent } from './auth.component'
import { AuthRoutingModule } from './auth-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UIModule } from '../../common/modules/ui/ui.module'

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, AuthRoutingModule, FormsModule, ReactiveFormsModule, UIModule],
  providers: [],
  exports: [],
})
export class AuthModule {}
