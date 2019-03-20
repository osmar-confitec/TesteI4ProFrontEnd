import {Routes} from "@angular/router";


export const ROUTES:Routes = [
    {path:'' 
    ,loadChildren:'./home-site/home-site.module#HomeSiteModule'},
    {path:'contatos-consulta/:atualizado' 
    ,loadChildren:'./contatos-consulta/contatos-consulta.module#ContatosConsultaModule'},
    {path:'contatos-crud/:id/:estado' 
    ,loadChildren:'./contatos-crud/contatos-crud.module#ContatosCrudModule'}
    
]