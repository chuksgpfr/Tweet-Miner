import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { DashComponent } from './dash/dash.component';
import { AuthGuard } from './auth/auth.guard';
import { PulltweetsComponent } from './dash/pulltweets/pulltweets.component';
import { ApidetailsComponent } from './dash/apidetails/apidetails.component';
import { EditapidetailsComponent } from './dash/editapidetails/editapidetails.component';
import { YourfolderComponent } from './dash/yourfolder/yourfolder.component';
import { TrendsComponent } from './dash/trends/trends.component';
import { VisualComponent } from './dash/visual/visual.component';

const routes: Routes = [
  {path: '', redirectTo:'/login', pathMatch:'full'},
  {path: '', children:[
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'dashboard', children:[
      {path:'', component: DashComponent},
      {path:'minetweet', component:PulltweetsComponent},
      {path:'minetweet/:keyword', component:PulltweetsComponent},
      {path:'apidetails', component:ApidetailsComponent},
      {path:'editapidetails', component:EditapidetailsComponent},
      {path: 'yourfolder', component:YourfolderComponent},
      {path: 'trends', component:TrendsComponent},
      {path: 'visual/:filename', component:VisualComponent}
    ], canActivate:[AuthGuard]}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
