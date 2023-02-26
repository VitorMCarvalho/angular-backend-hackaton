import { CreateUserComponent } from './views/create-user/create-user.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:":id", component: HomeComponent },
  { path:"create", component: CreateUserComponent },
  { path:"create/:id", component: CreateUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
