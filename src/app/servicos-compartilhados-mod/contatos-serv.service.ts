import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PessoaConsultMod } from '../modelos/pessoa-consult-mod';
import { PessoasMod } from '../modelos/pessoas-mod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContatosServService {

  Url:string =  environment.api;

  private UrlControl:string = 'Pessoas';

  IncluirPessoa(pessoa:PessoasMod):Observable<PessoasMod>
  {
      return this.http.post<PessoasMod>(`${this.Url}/${this.UrlControl}/IncluirPessoa`, pessoa); 
  }

  AtualizarPessoa(pessoa:PessoasMod):Observable<PessoasMod>
  {
     
    return this.http.put<PessoasMod>(`${this.Url}/${this.UrlControl}/AtualizarPessoa`, pessoa); 
  }

  ObterContatoDetalhes(id:string)
  {
      return this.http.get<PessoaConsultMod>(`${this.Url}/${this.UrlControl}/ObterPessoaDetalhada/${id}`);
  }

  DeletarPessoa(id:string):Observable<any>
  {
      return this.http.delete<any>(`${this.Url}/${this.UrlControl}/DeletarPessoa/${id}`);
  }

  DeletarEmail(id:string):Observable<any>
  {
      return this.http.delete<any>(`${this.Url}/${this.UrlControl}/DeletarEmail/${id}`);
  }

  DeletarTelefone(id:string):Observable<any>
  {
      return this.http.delete<any>(`${this.Url}/${this.UrlControl}/DeletarTelefone/${id}`);
  }

  

  ObterContatosConsulta(nome:string){
    let cons = '';
    if (!nome)
    cons= '_';
    else 
    cons = nome;
    return this.http.get<PessoaConsultMod[]>(`${this.Url}/${this.UrlControl}/ObterPessoas/${cons}`);
  }

  constructor(private http:HttpClient ){ }
}
