import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { MainGuard } from './guards/main.guard'
import { AuthGuard } from './guards/auth.guard'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/main/main.module').then(_ => _.MainModule),
    canActivate: [MainGuard],
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(_ => _.AuthModule),
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
