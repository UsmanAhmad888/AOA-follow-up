import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LatestAocComponent } from './components/latest-aoc/latest-aoc.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CallDetailsComponent } from './components/call-details/call-details.component';
import { AocStatusComponent } from './components/aoc-status/aoc-status.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api/api.service';
// import { RouterModule } from '@angular/router';
import { AocContainerComponent } from './components/aoc-container/aoc-container.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { ErrorComponent } from './components/error/error.component';
import { OrdinalPipe } from './services/pipes/ordinal.pipe';
@NgModule({
  declarations: [
    AppComponent,
    LatestAocComponent,
    ContactDetailsComponent,
    ProductsComponent,
    CommentsComponent,
    CallDetailsComponent,
    AocStatusComponent,
    LayoutComponent,
    HeaderComponent,
    AocContainerComponent,
    LoginComponent,
    ErrorComponent,
    OrdinalPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added    // RouterModule.forRoot([])
  ],
  providers: [ApiService,  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
