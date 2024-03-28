import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { UserLoginComponent } from './features/feature-auth/user-login/user-login.component';
import { authGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: UserLoginComponent },
  { path: 'registration', loadChildren: () => import('./features/feature-auth/feature-auth.module').then(m => m.FeatureAuthModule) },
  { path: 'chatpage', loadChildren: () => import('./features/feature-chat/feature-chat.module').then(m => m.FeatureChatModule), canActivate: [authGuard] },
  { path: 'video/:id', loadChildren: () => import('./features/feature-video/feature-video.module').then(m => m.FeatureVideoModule), canActivate: [authGuard] },
  { path: 'user/:id', loadChildren: () => import('./features/feature-user/feature-user.module').then(m => m.FeatureUserModule), canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
