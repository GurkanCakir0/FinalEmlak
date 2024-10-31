import { Yorum } from './../../Models/Yorum';
import { Sonuc } from './../../Models/Sonuc';
import { SiakyetDialogComponent } from './../Dialog/siakyet-dialog/siakyet-dialog.component';
import { sikayetim } from './../../Models/sikayet';
import { Uyeler } from './../../Models/Uyeler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Evilanim } from 'src/app/Models/Evilanim';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { EAlertService } from 'src/app/Service/EAlert.service';
import { ConfirmDialogComponent } from '../Dialog/Confirm-dialog/Confirm-dialog.component';
import { EvilanlariDialogComponent } from '../Dialog/evilanlari-dialog/evilanlari-dialog.component';
import {Location} from '@angular/common';
@Component({
  selector: 'app-Detayilan',
  templateUrl: './Detayilan.component.html',
  styleUrls: ['./Detayilan.component.scss']
})
export class DetayilanComponent implements OnInit {
  panelOpenState = false;
  datasource: any;
  evim:Evilanim[];
  secilan:Evilanim;
  secuyem:Uyeler[];
  ev:Evilanim;
  Ilanid:string;
  uid:string;
  yorumlar:Yorum[];
  dataSource: any;
  displayedColumns= ['Evuid','ilanbasligi','Fiyat','satilikirami','Evsehirid','EvCepheid','salonsayi','Katid'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogref:MatDialogRef<SiakyetDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.uid=(localStorage.getItem("uyeid")); 
    this.route.params.subscribe(p => {
      if (p.Ilanid) {
        this.Ilanid = p.Ilanid;
        this.EVListe();
        this.EListe();
        this.EvYorumListe();
      }
    });
  }
  UyeListe(){
    this.apiservis.UyeListe().subscribe((d: Uyeler[])=>{
      this.secuyem = d;
    });
  }
  EVListe(){
    this.apiservis.EvListe().subscribe((d: Evilanim[])=>{
      this.evim = d;
      this.dataSource = new MatTableDataSource(this.evim);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  EListe(){
    this.apiservis.EvByid(this.Ilanid).subscribe((d: Evilanim)=>{
      this.secilan = d;  
    });
  }
  geridon(){
    this._location.back();
  }
  SikayetEkle(){
    var yenikayit:sikayetim=new sikayetim();
    yenikayit.tarih = new Date();
    this.dialogref=this.matDialog.open(SiakyetDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.sikayetEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
        });
      }
    });
  }
  EvYorumListe() {
    this.apiservis.YorumListeEvId(this.Ilanid).subscribe((d: Yorum[]) => {
      this.yorumlar = d;
    });
  }
  YorumEkle(yorumMetni: string) {
    var yorum: Yorum = new Yorum();
    yorum.uid=this.uid; 
    yorum.Ilanid = this.Ilanid;
    yorum.YorumIcerik = yorumMetni;
    yorum.Tarih = new Date();

    this.apiservis.YorumEkle(yorum).subscribe((d: Sonuc) => {
      if (d.islem) {
        this.EvYorumListe();
      }
    });
  }
  YorumSil(kayit: Yorum) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.YorumIcerik + " Başlıklı Yorum Silinecektir Onaylıyor musunuz?";

    this.dialogRefConfirm.afterClosed().subscribe(d => {
      if (d) {
        this.apiservis.YorumSil(kayit.YorumId).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.EvYorumListe();
          }
        });
      }
    });
  }
}
