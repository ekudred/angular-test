import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MainRoutingModule } from './main-routing.module'
import { ModalModule } from '../../common/modules/modal/modal.module'
import { UIModule } from '../../common/modules/ui/ui.module'
import { IntersectionObserverDirective } from '../../common/directives/intersection-observer.directive'
import { ContentComponent } from './components/content/content.component'
import { MainComponent } from './main.component'
import { HeaderComponent } from './components/header/header.component'
import { CreatePostModalComponent } from './components/content/components/create-post-modal/create-post-modal.component'
import { PostComponent } from './components/content/components/post/post.component'
import { EditPostModalComponent } from './components/content/components/edit-post-modal/edit-post-modal.component'

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    ContentComponent,
    CreatePostModalComponent,
    PostComponent,
    IntersectionObserverDirective,
    EditPostModalComponent,
  ],
  imports: [CommonModule, MainRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, UIModule, ModalModule],
  providers: [],
  exports: [],
})
export class MainModule {}
