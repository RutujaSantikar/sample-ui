import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropdownsComponent } from './dropdowns/dropdowns.component';

const routes: Routes = [

  { 'path': '', 'component': DropdownsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
