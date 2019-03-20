import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { TemplateModule } from './template/template.module';
import { ServicosCompartilhadosModModule } from './servicos-compartilhados-mod/servicos-compartilhados-mod.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    TemplateModule,
    ServicosCompartilhadosModModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
