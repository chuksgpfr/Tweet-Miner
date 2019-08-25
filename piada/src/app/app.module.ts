import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxTreeDndModule } from 'ngx-tree-dnd';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { DashComponent } from './dash/dash.component';
import { PulltweetsComponent } from './dash/pulltweets/pulltweets.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ApidetailsComponent } from './dash/apidetails/apidetails.component';
import { EditapidetailsComponent } from './dash/editapidetails/editapidetails.component';
import { YourfolderComponent } from './dash/yourfolder/yourfolder.component';
import { TrendsComponent } from './dash/trends/trends.component';
import { VisualComponent } from './dash/visual/visual.component';
import { TreeComponent } from './dash/tree/tree.component';
import { VisualCircleComponent } from './dash/visual-circle/visual-circle.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    RegisterComponent,
    LoginComponent,
    DashComponent,
    PulltweetsComponent,
    ApidetailsComponent,
    EditapidetailsComponent,
    YourfolderComponent,
    TrendsComponent,
    VisualComponent,
    TreeComponent,
    VisualCircleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxTreeDndModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(
      {
        progressBar:true
      }
    ) // ToastrModule added
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
