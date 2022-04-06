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
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
