import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';
import { ChatService } from './core/services/chat.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
