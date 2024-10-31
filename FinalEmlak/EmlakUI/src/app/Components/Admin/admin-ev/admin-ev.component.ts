import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Evilanim } from 'src/app/Models/Evilanim';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Uyeler } from 'src/app/Models/Uyeler';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { EAlertService } from 'src/app/Service/EAlert.service';
import { ConfirmDialogComponent } from '../../Dialog/Confirm-dialog/Confirm-dialog.component';
import { EvfotodialogComponent } from '../../Dialog/evfotodialog/evfotodialog.component';
import { EvilanlariDialogComponent } from '../../Dialog/evilanlari-dialog/evilanlari-dialog.component';

@Component({
  selector: 'app-admin-ev',
  templateUrl: './admin-ev.component.html',
  styleUrls: ['./admin-ev.component.css']
})
export class AdminEvComponent implements OnInit {
  panelOpenState = false;
  datasource: any;
  evim:Evilanim[];
  uid:string;
  Evuid: string;
  uye: Uyeler;
  Ilanid:string;
  secilan:Evilanim;
  displayedColumns= ['resim','kadi','ilanbasligi','ilanaciklama','Evsehirid','EvCepheid','satilikirami','Fiyat','kira','Detay'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogref:MatDialogRef<EvilanlariDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  fotodialogref1:MatDialogRef<EvfotodialogComponent>
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.uid=(localStorage.getItem("uyeid")); 
    this.EVListe();
  }
  EVListe() {
    this.apiservis.EvListe().subscribe((d: Evilanim[]) => {
      this.evim = d;
      this.datasource = new MatTableDataSource(this.evim);
      this.datasource.sort = this.sort;
      this.datasource.paginator = this.paginator;
    });
  }
  EVEkle(){
    var yenikayit:Evilanim=new Evilanim();
    this.dialogref=this.matDialog.open(EvilanlariDialogComponent,{
      width:'1300px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });

    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        yenikayit.Fiyat=d.Fiyat;
        yenikayit.aidat=d.aidat;
        yenikayit.banyosayi=d.banyosayi;
        yenikayit.binakatsayi=d.binakatsayi;
        yenikayit.binayas=d.binayas;
        yenikayit.brut=d.brut;   
        yenikayit.esyali=d.esyali;
        yenikayit.goruntu=d.goruntu;
        yenikayit.ilanaciklama=d.ilanaciklama;
        yenikayit.ilanbasligi=d.ilanbasligi;
        yenikayit.ilcenere=d.ilcenere;
        yenikayit.kira=d.kira;
        yenikayit.konutsekil1=d.konutsekil1;
        yenikayit.kredi=d.kredi;
        yenikayit.mahnere=d.mahnere;
        yenikayit.net=d.net;
        yenikayit.odasayi=d.odasayi;
        yenikayit.salonsayi=d.salonsayi;
        yenikayit.satilikirami=d.satilikirami;
        yenikayit.sitemi=d.sitemi;
        yenikayit.takasmi=d.takasmi;

        yenikayit.EvCepheid=d.EvCepheid;
        yenikayit.EvIsinmaid=d.EvIsinmaid;
        yenikayit.EvKDid=d.EvKDid;
        yenikayit.EvTapid=d.EvTapid;
        yenikayit.EvYTid=d.EvYTid;
        yenikayit.EvYakid=d.EvYakid;
        yenikayit.EvYapid=d.EvYapid;
        yenikayit.Evsehirid=d.Evsehirid;
        yenikayit.Katid=d.Katid;
        yenikayit.resim="home.png";
        yenikayit.Evuid=this.uid; 
        this.apiservis.EvEkle(yenikayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EVListe(); 
          }
        });
      }
    });
  }
  EVDuzenle(kayit:Evilanim){
    this.dialogref=this.matDialog.open(EvilanlariDialogComponent,{
      width:'1300px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        kayit.Fiyat=d.Fiyat;
        kayit.aidat=d.aidat;
        kayit.banyosayi=d.banyosayi;
        kayit.binakatsayi=d.binakatsayi;
        kayit.binayas=d.binayas;
        kayit.brut=d.brut;
        kayit.Katid=d.Katid;
        kayit.EvCepheid=d.EvCepheid;
        kayit.esyali=d.esyali;
        kayit.goruntu=d.goruntu;
        kayit.ilanaciklama=d.ilanaciklama;
        kayit.ilanbasligi=d.ilanbasligi;
        kayit.ilcenere=d.ilcenere;
        kayit.Evsehirid=d.Evsehirid;
        kayit.EvIsinmaid=d.EvIsinmaid;
        kayit.kira=d.kira;
        kayit.konutsekil1=d.konutsekil1;
        kayit.kredi=d.kredi;
        kayit.EvKDid=d.EvKDid;
        kayit.mahnere=d.mahnere;
        kayit.net=d.net;
        kayit.odasayi=d.odasayi;
        kayit.salonsayi=d.salonsayi;
        kayit.satilikirami=d.satilikirami;
        kayit.sitemi=d.sitemi;
        kayit.takasmi=d.takasmi;
        kayit.EvTapid=d.EvTapid;
        kayit.EvYakid=d.EvYakid;
        kayit.EvYapid=d.EvYapid;
        kayit.EvYTid=d.EvYTid;

        this.apiservis.EvDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EVListe();
          }
        });
      }
    });
  }
  EVSil( evsil:Evilanim){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=evsil.ilanbasligi+"   Ev İlanı'nı Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.EvSil(evsil.Ilanid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EVListe();
          }
        });
      }
    });
  }
  FotoGuncelle(ev: Evilanim) {
    var yeniKayit = new Evilanim();
    this.fotodialogref1 = this.matDialog.open(EvfotodialogComponent, {
      width: "400px",
      data: ev
    });

    this.fotodialogref1.afterClosed().subscribe(d => {
      if (d) {
        d.Ilanid=ev.Ilanid;
        this.apiservis.EvFoto(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EVListe();
          }
        });
      }
    });
  }
  Filterele(e: any) {
    var deger = e.target.value;
    this.datasource.filter = deger.trim().toLowerCase();
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

}
