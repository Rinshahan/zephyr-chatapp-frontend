import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideocallComponent } from './videocall/videocall.component';
import { FeatureVideoRoutingModule } from './feature-video-routing.module';


@NgModule({
  declarations: [
    VideocallComponent
  ],
  imports: [
    CommonModule,
    FeatureVideoRoutingModule
  ]
})
export class FeatureVideoModule { }
