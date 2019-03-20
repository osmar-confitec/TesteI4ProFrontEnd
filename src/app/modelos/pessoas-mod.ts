import { TelefoneMod } from './telefone-mod';
import { EmailMod } from './email-mod';

export class PessoasMod {
    public id:string  = '';
    public nome:string = '';
    public email:string ='';
    public telefone:string = '';
    public telefones:Array<TelefoneMod> = new Array();
    public emails:Array<EmailMod> = new Array();

}
