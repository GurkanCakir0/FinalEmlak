import { ConfirmDialogComponent } from './../../Dialog/Confirm-dialog/Confirm-dialog.component';
import { Sonuc } from './../../../Models/Sonuc';
import { UyeDialogComponent } from './../../Dialog/Uye-dialog/Uye-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Uyeler } from './../../../Models/Uyeler';
import { ActivatedRoute } from '@angular/router';
import { EAlertService } from './../../../Service/EAlert.service';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { FotoDialogComponent } from './../../Dialog/foto-dialog/foto-dialog.component';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-adminuye',
  templateUrl: './adminuye.component.html',
  styleUrls: ['./adminuye.component.scss']
})
export class AdminuyeComponent implements OnInit {
  uyem:Uyeler[];
  dataSource: any;
  displayedColumns = ['foto','adsoyad','eposta','uyeadmin','kadi','Detay',];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  fotodialogref:MatDialogRef<FotoDialogComponent>
  dialogref:MatDialogRef<UyeDialogComponent>
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.UyeListe();
  }
  UyeListe(){
    this.apiservis.UyeListe().subscribe((d: Uyeler[])=>{
      this.uyem = d;
      this.dataSource = new MatTableDataSource(this.uyem);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  FotoGuncelle(uye: Uyeler) {
    var yeniKayit = new Uyeler();
    this.fotodialogref = this.matDialog.open(FotoDialogComponent, {
      width: "400px",
      data: uye
    });

    this.fotodialogref.afterClosed().subscribe(d => {
      if (d) {
        d.uid=uye.uid;
        this.apiservis.UyeFoto(d).subscribe(s => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListe();
          }
        });
      }
    });
  }

  uyeduzenler(yeniKayit:Uyeler){
    this.dialogref=this.matDialog.open(UyeDialogComponent,{
      width:'1000px',
      data:{
        kayit: yeniKayit,
        islem:'duzenle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        yeniKayit.adsoyad=d.adsoyad;
        yeniKayit.eposta=d.eposta;
        yeniKayit.kadi=d.kadi;
        yeniKayit.uyeadmin=d.uyeadmin;
        yeniKayit.sifre=d.sifre;
        this.apiservis.UyeDuzenle(yeniKayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListe();
          }
        });
      }
    });
  }
  UyeSil( uyesil:Uyeler){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=uyesil.adsoyad+"   Kişisini Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.UyeSil(uyesil.uid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.UyeListe();
          }
        });
      }
    });
  }
  Filterele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
