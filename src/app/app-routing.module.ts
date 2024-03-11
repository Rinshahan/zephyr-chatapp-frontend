import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./features/feature-auth/feature-auth.module').then(m => m.FeatureAuthModule) },
  { path: 'chatpage', loadChildren: () => import('./features/feature-chat/feature-chat.module').then(m => m.FeatureChatModule) },
  { path: 'video/:id', loadChildren: () => import('./features/feature-video/feature-video.module').then(m => m.FeatureVideoModule) }
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
