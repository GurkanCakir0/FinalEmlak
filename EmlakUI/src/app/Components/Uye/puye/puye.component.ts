import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { UyeFoto } from 'src/app/Models/Foto';
import { sikayetim } from 'src/app/Models/sikayet';
import { Sonuc } from 'src/app/Models/Sonuc';
import { Uyeler } from 'src/app/Models/Uyeler';
import { Yorum } from 'src/app/Models/Yorum';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { EAlertService } from 'src/app/Service/EAlert.service';
import { ConfirmDialogComponent } from '../../Dialog/Confirm-dialog/Confirm-dialog.component';
import { FotoDialogComponent } from '../../Dialog/foto-dialog/foto-dialog.component';
import { SiakyetDialogComponent } from '../../Dialog/siakyet-dialog/siakyet-dialog.component';

@Component({
  selector: 'app-puye',
  templateUrl: './puye.component.html',
  styleUrls: ['./puye.component.scss']
})
export class PuyeComponent implements OnInit {
  uyem:Uyeler[];
  Ilanid:string;
  yorumlar:Yorum[];
  foto:UyeFoto
  secuye:Uyeler;
  uid:string;
  dataSource: any;
  displayedColumns = ['foto',];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogref: MatDialogRef<SiakyetDialogComponent>;
  fotoDialogRef: MatDialogRef<FotoDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      if (p.uid) {
        this.uid = p.uid;
        this.UyeListe();
        this.UyeByListe();
        this.YorumListe()
      }
    });
  }
  UyeListe(){
    this.apiservis.UyeListe().subscribe((d: Uyeler[])=>{
      this.uyem = d;
      this.dataSource = new MatTableDataSource(this.uyem);
    });
  }
  UyeByListe(){
    this.apiservis.UyeByid(this.uid).subscribe((d: Uyeler)=>{
      this.secuye = d;
    });
  }
  geridon(){
    this._location.back();
  }
  

  SikayetEkle(){
    var yenikayit:sikayetim=new sikayetim();
    this.dialogref=this.matDialog.open(SiakyetDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    yenikayit.tarih = new Date();
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.sikayetEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
        });
      }
    });
  }
  YorumListe() {
    this.apiservis.YorumListe().subscribe((d: Yorum[]) => {
      this.yorumlar = d;
    });
  }
  UyeYorumListe() {
    this.apiservis.YorumListeByUyeId(this.uid).subscribe((d: Yorum[]) => {
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
        this.UyeYorumListe();
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
            this.UyeYorumListe();
          }
        });
      }
    });
  }

}
