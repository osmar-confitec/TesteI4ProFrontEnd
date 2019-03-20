import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatosCrudIndexComponent } from './contatos-crud-index/contatos-crud-index.component';
import { RouterModule, Routes } from '@angular/router';
import { TelefonesComponent } from './telefones/telefones.component';
import { EmailsComponent } from './emails/emails.component';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

const ROUTES:Routes = [
  {path:'',component:ContatosCrudIndexComponent}
];

@NgModule({
  declarations: [ContatosCrudIndexComponent, TelefonesComponent, EmailsComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(ROUTES),
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class ContatosCrudModule { }
