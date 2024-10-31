import { AdminEvComponent } from './Components/Admin/admin-ev/admin-ev.component';
import { PuyeComponent } from './Components/Uye/puye/puye.component';
import { EvfotodialogComponent } from './Components/Dialog/evfotodialog/evfotodialog.component';
import { AdminuyeComponent } from './Components/Admin/adminuye/adminuye.component';
import { FotoDialogComponent } from './Components/Dialog/foto-dialog/foto-dialog.component';
import { SiakyetDialogComponent } from './Components/Dialog/siakyet-dialog/siakyet-dialog.component';
import { ProfilUyeComponent } from './Components/Uye/Profil-uye/Profil-uye.component';
import { DetayilanComponent } from './Components/Detayilan/Detayilan.component';

import { EviminilaniComponent } from './Components/Eviminilani/Eviminilani.component';
import { AuthGuard } from './Service/AuthGuard';
import { AuthInterceptor } from './Service/AuthInterceptor';
import { SafeHtmlPipe } from './Pipes/safeHtml.pipe';
import { ApiServiceService } from './Service/Api-Service.service';
import { EvilanlariDialogComponent } from './Components/Dialog/evilanlari-dialog/evilanlari-dialog.component';
import { EvilaniComponent } from './Components/Uye/Evilani/Evilani.component';
import { YapitipiDialogComponent } from './Components/Dialog/yapitipi-dialog/yapitipi-dialog.component';
import { YapiDialogComponent } from './Components/Dialog/yapi-dialog/yapi-dialog.component';
import { YakitDialogComponent } from './Components/Dialog/Yakit-dialog/Yakit-dialog.component';
import { TapuDialogComponent } from './Components/Dialog/tapu-dialog/tapu-dialog.component';
import { KdDialogComponent } from './Components/Dialog/Kd-dialog/Kd-dialog.component';
import { KatDialogComponent } from './Components/Dialog/Kat-dialog/Kat-dialog.component';
import { IsiDialogComponent } from './Components/Dialog/Isi-dialog/Isi-dialog.component';
import { CepheDialogComponent } from './Components/Dialog/cephe-dialog/cephe-dialog.component';
import { UyeDialogComponent } from './Components/Dialog/Uye-dialog/Uye-dialog.component';
import { ConfirmDialogComponent } from './Components/Dialog/Confirm-dialog/Confirm-dialog.component';
import { AdminComponent } from './Components/Admin/admin/admin.component';
import { NavComponent } from './Components/Navbar/nav/nav.component';
import { LoginComponent } from './Components/Login/Login.component';
import { EAlertService } from './Service/EAlert.service';
import { AlertDialogComponent } from './Components/Dialog/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { AnasayfaCComponent } from './Components/AnasayfaC/AnasayfaC.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SehirDialogComponent } from './Components/Dialog/sehir-dialog/sehir-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    AnasayfaCComponent,
    LoginComponent,
    NavComponent,
    AdminComponent,
    EvilaniComponent,
    EviminilaniComponent,
    DetayilanComponent,
    ProfilUyeComponent,
    AdminuyeComponent,
    PuyeComponent,
    AdminEvComponent,
    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    CepheDialogComponent,
    IsiDialogComponent,
    KatDialogComponent,
    KdDialogComponent,
    TapuDialogComponent,
    YakitDialogComponent,
    YapiDialogComponent,
    YapitipiDialogComponent,
    SehirDialogComponent,
    EvilanlariDialogComponent,
    SiakyetDialogComponent,
    FotoDialogComponent,
    EvfotodialogComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatCarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UyeDialogComponent,
    CepheDialogComponent,
    IsiDialogComponent,
    KatDialogComponent,
    KdDialogComponent,
    TapuDialogComponent,
    YakitDialogComponent,
    YapiDialogComponent,
    YapitipiDialogComponent,
    SehirDialogComponent,
    EvilanlariDialogComponent,
    SiakyetDialogComponent,
    FotoDialogComponent,
  ],
  providers: [EAlertService,ApiServiceService,SafeHtmlPipe,AuthGuard,{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
