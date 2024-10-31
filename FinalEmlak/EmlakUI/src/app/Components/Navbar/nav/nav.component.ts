import { EAlertService } from './../../../Service/EAlert.service';
import { AlertDialogComponent } from './../../Dialog/alert-dialog/alert-dialog.component';
import { Sonuc } from './../../../Models/Sonuc';
import { Uyeler } from './../../../Models/Uyeler';
import { UyeDialogComponent } from './../../Dialog/Uye-dialog/Uye-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from './../../../Service/Api-Service.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  kadi: string;
  uid:string;
  uye:Uyeler;
  uyem:Uyeler[];
  secuye:Uyeler;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    dialogref:MatDialogRef<UyeDialogComponent>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public apiservis:ApiServiceService,
    public Matdialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit(): void{
    if (this.apiservis.OturumK) {
      this.kadi = localStorage.getItem("Kuladi");
    }
    if (this.apiservis.OturumK) {
      this.uid = localStorage.getItem("uyeid");
    }

  }
  OturumKapat(){
    localStorage.clear();
    location.href="/";
  }
  UyeById() {
    this.apiservis.UyeByid(this.uid).subscribe((d: Uyeler) => {
      this.uye = d;
    });
  }
  Ekle(){
    var yenikayit :Uyeler =new Uyeler();
    this.dialogref=this.Matdialog.open(UyeDialogComponent,{
      width:'500px',
      data:{
        kayit:yenikayit,
        islem:'ekle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        d.foto="profil.png"
        this.apiservis.UyeEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
        });
      }
    });
  }
}
