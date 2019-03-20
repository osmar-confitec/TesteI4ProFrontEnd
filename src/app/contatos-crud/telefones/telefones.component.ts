import { Component,TemplateRef, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { TelefoneMod } from "src/app/modelos/telefone-mod";
import { EstadosApp } from "src/app/modelos/estados-app";
import { AlertasServService } from "src/app/servicos-compartilhados-mod/alertas-serv.service";
import { ContatosServService } from "src/app/servicos-compartilhados-mod/contatos-serv.service";
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "cont-web-telefones",
  templateUrl: "./telefones.component.html",
  styleUrls: ["./telefones.component.css"]
})
export class TelefonesComponent implements OnInit {
  @Input() telefones: Array<TelefoneMod>;
  @Input() estadoPagina: EstadosApp;
  estadoTelefone: EstadosApp;
  modalRef: BsModalRef;
  telefoneRef:TelefoneMod = new TelefoneMod();
  telefoneForm:FormGroup;
  @ViewChild('templatetel') nameInputRef: TemplateRef<any>;

  constructor(
    private contatosServService: ContatosServService,
    private alertaServ: AlertasServService,
    private modalService: BsModalService,
    builder: FormBuilder
  ) {

    this.telefoneForm = builder.group({
       
      telefone: ""
    });

  }

  EditarTelefone(item:TelefoneMod)
  {

    this.estadoTelefone = EstadosApp.Atualizar;
        this.telefoneRef = item;
        this.OpenModal(this.nameInputRef);

  }

  Salvar()
  {
    if (this.estadoTelefone == EstadosApp.Novo)
    {

      let telefoneAdd = new  TelefoneMod();
      telefoneAdd.ativo = this.telefoneRef.ativo;
      telefoneAdd.numeroTelefone = this.telefoneRef.numeroTelefone;
      telefoneAdd.id = this.telefoneRef.id;
      this.telefones.push(telefoneAdd);
      this.modalRef.hide();
    }else 
    if (this.estadoTelefone == EstadosApp.Atualizar)
    {
      this.modalRef.hide();
    }

    
  }

  Novo()
  {
    this.estadoTelefone = EstadosApp.Novo;
    this.telefoneRef = new  TelefoneMod();
    this.OpenModal(this.nameInputRef);

  }

  OpenModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  DeletarTelefone(id: string) {
    if (this.estadoPagina != EstadosApp.Deletar) {
      if (confirm("Deseja realmente deletar esse telefone?")) {
        let ema = this.telefones.find(x => x.id == id);
        let index = this.telefones.indexOf(ema);
        let err = false;

        if (this.estadoPagina == EstadosApp.Atualizar && id ) {
          this.contatosServService.DeletarTelefone(id).subscribe(
            () => {},
            error => {
              this.alertaServ.error(` Houve algum problema! ${error} `);
              err = true;
            }
          );
        }

        if (!err) {
          this.alertaServ.success(` Dados atualizados com sucesso `);
          this.telefones.splice(index, 1);
        }
      }
    }
  }
  ngOnInit() {

    this.telefoneForm = new FormGroup({
    
      telefone: new FormControl(this.telefoneRef.numeroTelefone, [
        Validators.required      ])
    });

  }
}
