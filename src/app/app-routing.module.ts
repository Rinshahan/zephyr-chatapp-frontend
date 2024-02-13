import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'registration', loadChildren: () => import('./features/feature-auth/feature-auth.module').then(m => m.FeatureAuthModule) },
  { path: '', redirectTo: 'registration', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
