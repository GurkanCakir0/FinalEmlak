import { AdminEvComponent } from './Components/Admin/admin-ev/admin-ev.component';
import { PuyeComponent } from './Components/Uye/puye/puye.component';
import { AdminuyeComponent } from './Components/Admin/adminuye/adminuye.component';
import { ProfilUyeComponent } from './Components/Uye/Profil-uye/Profil-uye.component';
import { DetayilanComponent } from './Components/Detayilan/Detayilan.component';
import { EviminilaniComponent } from './Components/Eviminilani/Eviminilani.component';
import { AuthGuard } from './Service/AuthGuard';
import { EvilaniComponent } from './Components/Uye/Evilani/Evilani.component';
import { AdminComponent } from './Components/Admin/admin/admin.component';
import { LoginComponent } from './Components/Login/Login.component';
import { AnasayfaCComponent } from './Components/AnasayfaC/AnasayfaC.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', component:AnasayfaCComponent},
  {path:'login', component:LoginComponent},
  {path:'satilik', component:EviminilaniComponent,canActivate:[AuthGuard],data:{yetkiler:['Uye'],gerigit:'/'}},
  {path:'detay/:Ilanid', component:DetayilanComponent,canActivate:[AuthGuard],data:{yetkiler:['Uye'],gerigit:'/'}},
  {path:'uye/:uid', component:ProfilUyeComponent,canActivate:[AuthGuard],data:{yetkiler:['Uye'],gerigit:'/'}},
  {path:'uyem/:uid', component:PuyeComponent},
  {path:'admin', component:AdminComponent, canActivate:[AuthGuard],data:{yetkiler:['Admin'],gerigit:'/'}},
  {path:'admin/uye', component:AdminuyeComponent, canActivate:[AuthGuard],data:{yetkiler:['Admin'],gerigit:'/'}},
  {path:'evim/:uid', component:EvilaniComponent,canActivate:[AuthGuard],data:{yetkiler:['Uye'],gerigit:'/'}},
  {path:'admin/ev', component:AdminEvComponent,canActivate:[AuthGuard],data:{yetkiler:['Admin'],gerigit:'/'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
