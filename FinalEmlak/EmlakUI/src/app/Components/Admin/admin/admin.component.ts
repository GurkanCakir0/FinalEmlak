import { Il } from './../../../Models/Il';
import { SehirDialogComponent } from './../../Dialog/sehir-dialog/sehir-dialog.component';
import { YapitipiDialogComponent } from './../../Dialog/yapitipi-dialog/yapitipi-dialog.component';
import { YapiTipi } from './../../../Models/Ytipi';
import { YapiDialogComponent } from './../../Dialog/yapi-dialog/yapi-dialog.component';
import { Yapi } from './../../../Models/Yapi';
import { YakitDialogComponent } from './../../Dialog/Yakit-dialog/Yakit-dialog.component';
import { Yakit } from './../../../Models/Yakit';
import { TapuDialogComponent } from './../../Dialog/tapu-dialog/tapu-dialog.component';
import { Tapu } from './../../../Models/Tapu';
import { KdDialogComponent } from './../../Dialog/Kd-dialog/Kd-dialog.component';
import { KDurumu } from './../../../Models/Kdurumu';
import { KatDialogComponent } from './../../Dialog/Kat-dialog/Kat-dialog.component';
import { BKat } from './../../../Models/Kat';
import { IsiDialogComponent } from './../../Dialog/Isi-dialog/Isi-dialog.component';
import { Isinma } from './../../../Models/Isinma';
import { ConfirmDialogComponent } from './../../Dialog/Confirm-dialog/Confirm-dialog.component';
import { EAlertService } from './../../../Service/EAlert.service';
import { Sonuc } from './../../../Models/Sonuc';
import { CepheDialogComponent } from './../../Dialog/cephe-dialog/cephe-dialog.component';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { ApiServiceService } from './../../../Service/Api-Service.service';
import { Cephe } from './../../../Models/Cephe';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  panelOpenState = false;
  /**DataSource Başlangıç */
  datasource: any;
  datasource1:any;
  datasource2:any;
  datasource3:any;
  datasource4:any;
  datasource5:any;
  datasource6:any;
  datasource7:any;
  datasource8:any;
  /**DataSource Bitiş */

  /*İlan Detay Model Başlangıç */
  cepheler:Cephe[];
  Isinmaturu:Isinma[];
  bulkat:BKat[];
  kdurumu:KDurumu[];
  tapular:Tapu[];
  yktip:Yakit[];
  yapidurum:Yapi[];
  yapitp:YapiTipi[];
  sehir:Il[];
  /*İlan detay Model Bitiş*/

  /*DisplayColum Başlangıç */
  displayedColumns= ['cyon','Detay'];
  displayedColumns1=['Itur','Detaylar'];
  displayedColumns2=['Bkat','Detaylar'];
  displayedColumns3=['Durumu','Detaylar'];
  displayedColumns4=['Tapum','Detaylar'];
  displayedColumns5=['YTuru','Detaylar'];
  displayedColumns6=['YapDurumu','Detaylar'];
  displayedColumns7=['Yapitipi','Detaylar'];
  displayedColumns8=['il','Detaylar'];
  /*DisplayColum Bitiş */

  /*Paginator ve Sort Başlangıç */
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort1:MatSort;
  @ViewChild(MatPaginator) paginator1:MatPaginator;
  @ViewChild(MatSort) sort2:MatSort;
  @ViewChild(MatPaginator) paginator2:MatPaginator;
  @ViewChild(MatSort) sort3:MatSort;
  @ViewChild(MatPaginator) paginator3:MatPaginator;
  @ViewChild(MatSort) sort4:MatSort;
  @ViewChild(MatPaginator) paginator4:MatPaginator;
  @ViewChild(MatSort) sort5:MatSort;
  @ViewChild(MatPaginator) paginator5:MatPaginator;
  @ViewChild(MatSort) sort6:MatSort;
  @ViewChild(MatPaginator) paginator6:MatPaginator;
  @ViewChild(MatSort) sort7:MatSort;
  @ViewChild(MatPaginator) paginator7:MatPaginator;
  @ViewChild(MatSort) sort8:MatSort;
  @ViewChild(MatPaginator) paginator8:MatPaginator;
/*Paginator ve Sort Bitiş */
  /*Dialog Başlangıç*/
  dialogref:MatDialogRef<CepheDialogComponent>;
  dialogref1:MatDialogRef<IsiDialogComponent>;
  dialogref2:MatDialogRef<KatDialogComponent>;
  dialogref3:MatDialogRef<KdDialogComponent>;
  dialogref4:MatDialogRef<TapuDialogComponent>;
  dialogref5:MatDialogRef<YakitDialogComponent>;
  dialogref6:MatDialogRef<YapiDialogComponent>;
  dialogref7:MatDialogRef<YapitipiDialogComponent>;
  dialogref8:MatDialogRef<SehirDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  /*Dialog Bitiş*/

  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
  ) { }

  ngOnInit() {
    this.CepheListe();
    this.IsiListe();
    this.KatListe();
    this.KdListe();
    this.TapumListe();
    this.yakitimListe();
    this.YapiDListe();
    this.YapiTipListe();
    this.SehirListe();
  }

  /**Cephe Yönü Başlangıç */
  CepheListe(){
    this.apiservis.CepheListe().subscribe((d: Cephe[])=>{
      this.cepheler = d;
      this.datasource=new MatTableDataSource(d);
      this.datasource.sort=this.sort;
      this.datasource.paginator=this.paginator;
    });
  }
  Cephekle(){
    var yenikayit:Cephe=new Cephe();
    this.dialogref=this.matDialog.open(CepheDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit,
        islem: 'ekle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.CepheEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CepheListe(); 
          }
        });
      }
    });
  }
  CepheDuzenle(kayit:Cephe){
    this.dialogref=this.matDialog.open(CepheDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
    });
    this.dialogref.afterClosed().subscribe(d=>{
      if (d) {
        kayit.cyon=d.cyon;
        this.apiservis.CepheDuzenle(kayit).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CepheListe();
          }
        });
      }
    });
  }

  CepheSil( Cepheid){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=Cepheid.cyon+"   Cephe Yönü Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.CepheSil(Cepheid.Cepheid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.CepheListe();
          }
        });
      }
    });
  }
  /**Cephe Yönü Bitiş */

  /**Isınma Türü Başlangıç */
  IsiListe(){
    this.apiservis.IsiListe().subscribe((d: Isinma[])=>{
      this.Isinmaturu = d;
      this.datasource1=new MatTableDataSource(d);
      this.datasource1.sort=this.sort1;
      this.datasource1.paginator=this.paginator1;
    });
  }
  Isiekle(){
    var yenikayit1:Isinma=new Isinma();
    this.dialogref1=this.matDialog.open(IsiDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit1,
        islem: 'ekle'
      }
    });
    this.dialogref1.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.IsiEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.IsiListe(); 
          }
        });
      }
    });
  }
  IsiDuzenle(kayit1:Isinma){
    this.dialogref1=this.matDialog.open(IsiDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit1,
        islem:'duzenle'
      }
    });
    this.dialogref1.afterClosed().subscribe(x=>{
      if (x) {
        kayit1.Itur=x.Itur;
        this.apiservis.IsilarDuzenle(kayit1).subscribe((y:Sonuc)=>{
          this.alert.AlertUygula(y);
          if (y.islem) {
            this.IsiListe();
          }
        });
      }
    });
  }
  IsiSil(Isinmaid){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=Isinmaid.Itur+"   Isı Türü'nü Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.IsiSil(Isinmaid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.IsiListe();
          }
        });
      }
    });
  }
  /**Isınma Türü Bitiş */

  /* Bulunduğu Kat Başlangıç */
  KatListe(){
    this.apiservis.BkatListe().subscribe((d: BKat[])=>{
      this.bulkat = d;
      this.datasource2=new MatTableDataSource(d);
      this.datasource2.sort=this.sort2;
      this.datasource2.paginator=this.paginator2;
    });
  }
  Katekle(){
    var yenikayit2:BKat=new BKat();
    this.dialogref2=this.matDialog.open(KatDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit2,
        islem: 'ekle'
      }
    });
    this.dialogref2.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.BkatEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KatListe(); 
          }
        });
      }
    });
  }
  KatDuzenle(kayit2:BKat){
    this.dialogref2=this.matDialog.open(KatDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit2,
        islem:'duzenle'
      }
    });
    this.dialogref2.afterClosed().subscribe(x=>{
      if (x) {
        kayit2.Bkat=x.Bkat;
        this.apiservis.BkatlarDuzenle(kayit2).subscribe((y:Sonuc)=>{
          this.alert.AlertUygula(y);
          if (y.islem) {
            this.KatListe();
          }
        });
      }
    });
  }
  KtSil( Katid){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=Katid.Bkat+"   Bulunduğu Kat'ı Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.BkatSil(Katid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KatListe();
          }
        });
      }
    });
  }
    /* Bulunduğu Kat Bitiş */

      /* Kullanım Durumu Başlangıç */
  KdListe(){
    this.apiservis.KDListe().subscribe((d: KDurumu[])=>{
      this.kdurumu = d;
      this.datasource3=new MatTableDataSource(d);
      this.datasource3.sort=this.sort3;
      this.datasource3.paginator=this.paginator3;
    });
  }
  Kdekle(){
    var yenikayit3:KDurumu=new KDurumu();
    this.dialogref3=this.matDialog.open(KdDialogComponent,{
      width:'400px',
      data: {
        kayit: yenikayit3,
        islem: 'ekle'
      }
    });
    this.dialogref3.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.KDEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KdListe(); 
          }
        });
      }
    });
  }
  KdDuzenle(kayit3:KDurumu){
    this.dialogref3=this.matDialog.open(KdDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit3,
        islem:'duzenle'
      }
    });
    this.dialogref3.afterClosed().subscribe(x=>{
      if (x) {
        kayit3.Durumu=x.Durumu;
        this.apiservis.KDuzenle(kayit3).subscribe((y:Sonuc)=>{
          this.alert.AlertUygula(y);
          if (y.islem) {
            this.KdListe();
          }
        });
      }
    });
  }
  KdSil( KDid){
    this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width:'400px',
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj=KDid.Durumu+"   Bulunduğu Kat'ı Silmeye Emin misiniz?"
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d) {
        this.apiservis.KDSil(KDid).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KdListe();
          }
        });
      }
    });
  }
    /* Kullanım Durumu Bitiş */

    /* Tapu Başlangıç */
    TapumListe(){
      this.apiservis.TPListe().subscribe((d: Tapu[])=>{
        this.tapular = d;
        this.datasource4=new MatTableDataSource(d);
        this.datasource4.sort=this.sort4;
        this.datasource4.paginator=this.paginator4;
      });
    }
    Tapumekle(){
      var yenikayit4:Tapu=new Tapu();
      this.dialogref4=this.matDialog.open(TapuDialogComponent,{
        width:'400px',
        data: {
          kayit: yenikayit4,
          islem: 'ekle'
        }
      });
      this.dialogref4.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.TPEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.TapumListe(); 
            }
          });
        }
      });
    }
    TapumDuzenle(kayit4:Tapu){
      this.dialogref4=this.matDialog.open(TapuDialogComponent,{
        width:'400px',
        data:{
          kayit: kayit4,
          islem:'duzenle'
        }
      });
      this.dialogref4.afterClosed().subscribe(x=>{
        if (x) {
          kayit4.Tapum=x.Tapum;
          this.apiservis.TPDuzenle(kayit4).subscribe((y:Sonuc)=>{
            this.alert.AlertUygula(y);
            if (y.islem) {
              this.TapumListe();
            }
          });
        }
      });
    }
    TapumSil( Tapid){
      this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=Tapid.Tapum+"   Tapu'yu Silmeye Emin misiniz?"
      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.TPSil(Tapid).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.TapumListe();
            }
          });
        }
      });
    }
    /* Tapu Bitiş */

    /*Yakıt Tipi Başlangıç*/
    yakitimListe(){
      this.apiservis.YakitListe().subscribe((d: Yakit[])=>{
        this.yktip = d;
        this.datasource5=new MatTableDataSource(d);
        this.datasource5.sort=this.sort5;
        this.datasource5.paginator=this.paginator5;
      });
    }
    YKTekle(){
      var yenikayit5:Yakit=new Yakit();
      this.dialogref5=this.matDialog.open(YakitDialogComponent,{
        width:'400px',
        data: {
          kayit: yenikayit5,
          islem: 'ekle'
        }
      });
      this.dialogref5.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YakitEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.yakitimListe(); 
            }
          });
        }
      });
    }
    YKTDuzenle(kayit5:Yakit){
      this.dialogref5=this.matDialog.open(YakitDialogComponent,{
        width:'400px',
        data:{
          kayit: kayit5,
          islem:'duzenle'
        }
      });
      this.dialogref5.afterClosed().subscribe(x=>{
        if (x) {
          kayit5.YTuru=x.YTuru;
          this.apiservis.YakitDuzenle(kayit5).subscribe((y:Sonuc)=>{
            this.alert.AlertUygula(y);
            if (y.islem) {
              this.yakitimListe();
            }
          });
        }
      });
    }
    YKTSil( Yakid){
      this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=Yakid.YTuru+"   Yakıt Tipi'ni Silmeye Emin misiniz?"
      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YakitSil(Yakid).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.yakitimListe();
            }
          });
        }
      });
    }
    /*Yakıt Tipi Bitiş*/

    /*Yapı Durumu Başlangıç*/
    YapiDListe(){
      this.apiservis.YapiListe().subscribe((d: Yapi[])=>{
        this.yapidurum = d;
        this.datasource6=new MatTableDataSource(d);
        this.datasource6.sort=this.sort6;
        this.datasource6.paginator=this.paginator6;
      });
    }
    YapiDekle(){
      var yenikayit6:Yapi=new Yapi();
      this.dialogref6=this.matDialog.open(YapiDialogComponent,{
        width:'400px',
        data: {
          kayit: yenikayit6,
          islem: 'ekle'
        }
      });
      this.dialogref6.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YapiEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.YapiDListe(); 
            }
          });
        }
      });
    }
    YapiDDuzenle(kayit6:Yapi){
      this.dialogref6=this.matDialog.open(YapiDialogComponent,{
        width:'400px',
        data:{
          kayit: kayit6,
          islem:'duzenle'
        }
      });
      this.dialogref6.afterClosed().subscribe(x=>{
        if (x) {
          kayit6.YapDurumu=x.YapDurumu;
          this.apiservis.YapiDuzenle(kayit6).subscribe((y:Sonuc)=>{
            this.alert.AlertUygula(y);
            if (y.islem) {
              this.YapiDListe();
            }
          });
        }
      });
    }
    YapiDSil( Yapid){
      this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=Yapid.YapDurumu+"   Yapı Durumu'nu Silmeye Emin misiniz?"
      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YapiSil(Yapid).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.YapiDListe();
            }
          });
        }
      });
    }
    /*Yapı Durumu Bitiş*/

    /*Yapı Tipi Başlangıç*/
    YapiTipListe(){
      this.apiservis.YapiTListe().subscribe((d: YapiTipi[])=>{
        this.yapitp = d;
        this.datasource7=new MatTableDataSource(d);
        this.datasource7.sort=this.sort7;
        this.datasource7.paginator=this.paginator7;
      });
    }
    YapiTipekle(){
      var yenikayit7:YapiTipi=new YapiTipi();
      this.dialogref7=this.matDialog.open(YapitipiDialogComponent,{
        width:'400px',
        data: {
          kayit: yenikayit7,
          islem: 'ekle'
        }
      });
      this.dialogref7.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YapiTEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.YapiTipListe(); 
            }
          });
        }
      });
    }
    YapiTipDuzenle(kayit7:YapiTipi){
      this.dialogref7=this.matDialog.open(YapitipiDialogComponent,{
        width:'400px',
        data:{
          kayit: kayit7,
          islem:'duzenle'
        }
      });
      this.dialogref7.afterClosed().subscribe(x=>{
        if (x) {
          kayit7.Yapitipi=x.Yapitipi;
          this.apiservis.YapiTDuzenle(kayit7).subscribe((y:Sonuc)=>{
            this.alert.AlertUygula(y);
            if (y.islem) {
              this.YapiTipListe();
            }
          });
        }
      });
    }
    YapiTipDSil( YTid){
      this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=YTid.Yapitipi+"   Yapı Tipi'ni Silmeye Emin misiniz?"
      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.YapiTSil(YTid).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.YapiTipListe();
            }
          });
        }
      });
    }
    /*Yapı Tipi Bitiş*/
    
    /*İl Başlangıç */
    SehirListe(){
      this.apiservis.IlListe().subscribe((d: Il[])=>{
        this.sehir = d;
        this.datasource8=new MatTableDataSource(d);
        this.datasource8.sort8=this.sort8;
        this.datasource8.paginator8=this.paginator8;
      });
    }
    Sehirekle(){
      var yenikayit8:Il=new Il();
      this.dialogref8=this.matDialog.open(SehirDialogComponent,{
        width:'400px',
        data: {
          kayit: yenikayit8,
          islem: 'ekle'
        }
      });
      this.dialogref8.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.IleEkle(d).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.SehirListe(); 
            }
          });
        }
      });
    }
    SehirDuzenle(kayit8:Il){
      this.dialogref8=this.matDialog.open(SehirDialogComponent,{
        width:'400px',
        data:{
          kayit: kayit8,
          islem:'duzenle'
        }
      });
      this.dialogref8.afterClosed().subscribe(x=>{
        if (x) {
          kayit8.il=x.il;
          this.apiservis.IlDuzenle(kayit8).subscribe((y:Sonuc)=>{
            this.alert.AlertUygula(y);
            if (y.islem) {
              this.SehirListe();
            }
          });
        }
      });
    }
    SehirSil( sehirid){
      this.dialogRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
        width:'400px',
      });
      this.dialogRefConfirm.componentInstance.dialogMesaj=sehirid.il+"  Şehri'ni Silmeye Emin misiniz?"
      this.dialogRefConfirm.afterClosed().subscribe(d=>{
        if (d) {
          this.apiservis.IlSil(sehirid).subscribe((s:Sonuc)=>{
            this.alert.AlertUygula(s);
            if (s.islem) {
              this.SehirListe();
            }
          });
        }
      });
    }
    /*İl Bitiş */
}
