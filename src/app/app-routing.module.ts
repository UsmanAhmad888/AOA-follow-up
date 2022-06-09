import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AocContainerComponent } from './components/aoc-container/aoc-container.component';
import { LatestAocComponent } from './components/latest-aoc/latest-aoc.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard/auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  {
    path: 'home', component: LayoutComponent, children: [

      { path: '', component: AocContainerComponent, canActivate: [AuthGuard] },
      { path: ':guid', component: AocContainerComponent, canActivate: [AuthGuard] }
    ]
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
