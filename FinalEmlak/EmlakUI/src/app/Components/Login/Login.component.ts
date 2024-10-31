import { EAlertService } from './../../Service/EAlert.service';
import { Sonuc } from './../../Models/Sonuc';
import { ApiServiceService } from './../../Service/Api-Service.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public apiservis:ApiServiceService,
    public alert:EAlertService
  ) { }

  ngOnInit() {
  }

  OturumAc(kuladi:string,sifre:string){
    this.apiservis.tokenAl(kuladi,sifre).subscribe((d:any) =>{
      localStorage.setItem("token",d.access_token);
      localStorage.setItem("uyeid",d.uyeId);
      localStorage.setItem("Kuladi",d.uyeKadi);
      localStorage.setItem("Yetki",d.uyeYetkileri);
      location.href="/";
    },err =>{
      var s: Sonuc =new Sonuc();
      s.islem=false;
      s.mesaj="Kullanıcı Adı veya Şifre Yanlış!"
      this.alert.AlertUygula(s);
    });
  }
}
