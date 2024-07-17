import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { StudentListComponent } from './student-list/student-list.component';

const routes: Routes = [
  {path:'header',component:HeaderComponent},
  {path:'',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'studentList',component:StudentListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
