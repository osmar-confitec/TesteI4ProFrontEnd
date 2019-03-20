import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexCompComponent } from './index-comp/index-comp.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES:Routes = [
  {path:'',component:IndexCompComponent}
];

@NgModule({
  declarations: [IndexCompComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class HomeSiteModule { }
