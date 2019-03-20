import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosIndexCompComponent } from './contatos-index-comp/contatos-index-comp.component';
import { RouterModule, Routes } from '@angular/router';
import{ FormsModule } from '@angular/forms';
const ROUTES:Routes = [
  {path:'',component:ContatosIndexCompComponent}
];

@NgModule({
  declarations: [ContatosIndexCompComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(ROUTES),
    FormsModule
  ]
})
export class ContatosConsultaModule { }
