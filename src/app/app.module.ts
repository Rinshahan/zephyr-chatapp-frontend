import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { ChatService } from './core/services/chat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IncomingcallmodalComponent } from './shared/incomingcallmodal/incomingcallmodal.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button';
import { WaitinguseracceptanceComponent } from './shared/waitinguseracceptance/waitinguseracceptance.component';
import { UserDeleteConfirmComponent } from './shared/user-delete-confirm/user-delete-confirm.component';
import { ToastrModule } from 'ngx-toastr'

@NgModule({
  declarations: [
    AppComponent,
    IncomingcallmodalComponent,
    WaitinguseracceptanceComponent,
    UserDeleteConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatButtonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
