import { Component, OnInit } from '@angular/core';
import { ContatosServService } from 'src/app/servicos-compartilhados-mod/contatos-serv.service';
import { PessoaConsultMod } from 'src/app/modelos/pessoa-consult-mod';
import { AlertasServService } from 'src/app/servicos-compartilhados-mod/alertas-serv.service';
import { EstadosApp } from 'src/app/modelos/estados-app';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cont-web-contatos-index-comp',
  templateUrl: './contatos-index-comp.component.html',
  styleUrls: ['./contatos-index-comp.component.css']
})
export class ContatosIndexCompComponent implements OnInit {

  constructor(private contatosServService:ContatosServService,
              private alertaServ:AlertasServService,
              private route: ActivatedRoute
    ) { }


    _pessoaConsultMod:PessoaConsultMod[] = [];
    
      
    _pessoaConsultModel:PessoaConsultMod = new PessoaConsultMod();

    consultarPessoas():void
    {

      this.contatosServService.ObterContatosConsulta(this._pessoaConsultModel.nome).subscribe((pessoaConsultMod:PessoaConsultMod[])=>{
        this._pessoaConsultMod  = pessoaConsultMod;
  
      },error=>{
            this.alertaServ.error(` Houve algum problema! ${error} `);
      }
      
      );
    }


  ngOnInit() {

    this.consultarPessoas();

    this.route.paramMap.subscribe(params => {
      
      let atualizado = params.get("atualizado"); 
      if(atualizado == "1")
      {
        this.alertaServ.success(` Dados atualizados com sucesso!!`)

      }

    });

  }

}
