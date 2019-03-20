import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PessoasMod } from "src/app/modelos/pessoas-mod";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ContatosServService } from "src/app/servicos-compartilhados-mod/contatos-serv.service";
import { EstadosApp } from "src/app/modelos/estados-app";
import { AlertasServService } from "src/app/servicos-compartilhados-mod/alertas-serv.service";

@Component({
  selector: "cont-web-contatos-crud-index",
  templateUrl: "./contatos-crud-index.component.html",
  styleUrls: ["./contatos-crud-index.component.css"]
})
export class ContatosCrudIndexComponent implements OnInit {
  id: string = "";

  public contatoForm: FormGroup;
  public estadoPagina: EstadosApp;

  public estadoPaginaHtml = EstadosApp;

  pessoasMod: PessoasMod = new PessoasMod();

  constructor(
    private router: Router,
    private alertaServ: AlertasServService,
    private route: ActivatedRoute,
    builder: FormBuilder,
    private contatosServService: ContatosServService
  ) {
    this.contatoForm = builder.group({
      nome: "",
      telefone: "",
      email: ""
    });
  }

  salvar(): void {

   

    if (this.estadoPagina === EstadosApp.Novo) {
      this.contatosServService.IncluirPessoa(this.pessoasMod).subscribe(
        (pessret: PessoasMod) => {
          this.router.navigate(["/contatos-consulta", "1"]);
        },
        error => {
          console.log(error.error);
          this.alertaServ.error(` Houve algum problema!! ${error.error} `);
        }
      );
    } else if (this.estadoPagina === EstadosApp.Deletar) {
      this.contatosServService.DeletarPessoa(this.pessoasMod.id).subscribe(
        (pessret: PessoasMod) => {
          this.router.navigate(["/contatos-consulta", "1"]);
        },
        error => {
          console.log(error);
          this.alertaServ.error(` Houve algum problema!! ${error} `);
        }
      );
    }
    else if (this.estadoPagina === EstadosApp.Atualizar) {
      this.contatosServService.AtualizarPessoa(this.pessoasMod).subscribe(
        (pessret: PessoasMod) => {
          this.router.navigate(["/contatos-consulta", "1"]);
        },
        error => {
          console.log(error);
          this.alertaServ.error(` Houve algum problema!! ${error} `);
        }
      );
    }


  }

  ngOnInit() {
    this.contatoForm = new FormGroup({
      nome: new FormControl(this.pessoasMod.nome, [Validators.required]),
      telefone: new FormControl(this.pessoasMod.telefone, [
        Validators.required,
        Validators.required
      ]),
      email: new FormControl(this.pessoasMod.email, [
        Validators.required,
        Validators.email
      ])
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get("id");
      let estado = params.get("estado");
      if (estado == "Novo") this.estadoPagina = EstadosApp.Novo;
      else if (estado == "Editar") {
        this.estadoPagina = EstadosApp.Atualizar;
        this.ObterPessoasDetalhes();
      } else if (estado == "Excluir") {
        this.estadoPagina = EstadosApp.Deletar;
        this.ObterPessoasDetalhes();
      }
    });
  }

  private ObterPessoasDetalhes() {
    this.contatosServService.ObterContatoDetalhes(this.id).subscribe(
      (pessoaDet: PessoasMod) => {
        this.pessoasMod = pessoaDet;
        console.log(this.pessoasMod);
      },
      error => {
        this.alertaServ.error(` Houve algum problema!! ${error} `);
      }
    );
  }
}
