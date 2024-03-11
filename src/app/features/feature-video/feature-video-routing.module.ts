import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VideocallComponent } from "./videocall/videocall.component";

const routes: Routes = [
  { path: '', component: VideocallComponent }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class FeatureVideoRoutingModule { }