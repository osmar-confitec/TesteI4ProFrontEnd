import { Component,TemplateRef, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { EmailMod } from "src/app/modelos/email-mod";
import { EstadosApp } from "src/app/modelos/estados-app";
import { ContatosServService } from "src/app/servicos-compartilhados-mod/contatos-serv.service";
import { AlertasServService } from 'src/app/servicos-compartilhados-mod/alertas-serv.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "cont-web-emails",
  templateUrl: "./emails.component.html",
  styleUrls: ["./emails.component.css"]
})
export class EmailsComponent implements OnInit {
  @Input() emails: Array<EmailMod>;
  @Input() estadoPagina: EstadosApp;
  estadoEmail:EstadosApp;
  modalRef: BsModalRef;
  emailRef:EmailMod = new EmailMod();
  emailForm:FormGroup;
  @ViewChild('template') nameInputRef: TemplateRef<any>;

  constructor(private contatosServService: ContatosServService
              ,private alertaServ:AlertasServService
              ,private modalService: BsModalService
              ,builder: FormBuilder,
    ) {

      this.emailForm = builder.group({
       
        email: ""
      });

    }

    Novo()
    {
      this.estadoEmail = EstadosApp.Novo;
      this.emailRef = new  EmailMod();
      this.OpenModal(this.nameInputRef);
    }

   

    OpenModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }

    EditarEmail(emailEdit:EmailMod){
        this.estadoEmail = EstadosApp.Atualizar;
        this.emailRef = emailEdit;
        this.OpenModal(this.nameInputRef);
    }

    Salvar()
    {
      if (this.estadoEmail == EstadosApp.Novo)
      {

        let emailAdd = new  EmailMod();
        emailAdd.ativo = this.emailRef.ativo;
        emailAdd.enderecoEmail = this.emailRef.enderecoEmail;
        emailAdd.id = this.emailRef.id;
        this.emails.push(emailAdd);
        this.modalRef.hide();
      }else 
      if (this.estadoEmail == EstadosApp.Atualizar)
      {
        this.modalRef.hide();
      }

      
    }

  DeletarEmail(id: string) {
    if (this.estadoPagina != EstadosApp.Deletar) {


      if (confirm("Deseja realmente deletar esse email?")) {

        let ema = this.emails.find(x => x.id == id);
        let index = this.emails.indexOf(ema);
        let err = false;

        if (this.estadoPagina == EstadosApp.Atualizar && id ) {
          this.contatosServService
            .DeletarEmail(id)
            .subscribe(
              () => {
                    
              },
              error => {
                this.alertaServ.error(` Houve algum problema! ${error} `);
                err = true;
              }
            );
        }

        if (!err){
          this.alertaServ.success(` Dados atualizados com sucesso `);
          this.emails.splice(index, 1);

        }
        
      }
    }
  }
  ngOnInit() {

    this.emailForm = new FormGroup({
    
      email: new FormControl(this.emailRef.enderecoEmail, [
        Validators.required,
        Validators.email
      ])
    });

  }
}
