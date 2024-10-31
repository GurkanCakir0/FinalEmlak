import { ActivatedRoute } from '@angular/router';
import { Cephe } from './../../../Models/Cephe';
import { Tapu } from './../../../Models/Tapu';
import { KDurumu } from './../../../Models/Kdurumu';
import { YapiTipi } from './../../../Models/Ytipi';
import { Yapi } from './../../../Models/Yapi';
import { Yakit } from './../../../Models/Yakit';
import { BKat } from './../../../Models/Kat';
import { Il } from './../../../Models/Il';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Isinma } from './../../../Models/Isinma';
import { EAlertService } from './../../../Service/EAlert.service';
import { ApiServiceService } from './../../../Service/Api-Service.service';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Evilanim } from './../../../Models/Evilanim';
import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-evilanlari-dialog',
  templateUrl: './evilanlari-dialog.component.html',
  styleUrls: ['./evilanlari-dialog.component.css']
})
export class EvilanlariDialogComponent implements OnInit {
  EvCepheid = new FormControl();
  kredim:string[]=['Uygun','Uygun Değil',];
  goruntu:string[]=['Evet','Hayır',];
  yayin:string[]=['Satılık','Kiralık',];
  konuts:string[]=['Bahçe Dubleksi','Bahçe Katı','Çatı Dubleksi','Daire','Dubleks','İkiz Ev','Müstakil Ev','Tripleks','Fourlex',];
  esyali:string[]=['Evet','Hayır',];
  tks:string[]=['Yapılır','Yapılmaz',];
  sitemi:string[]=['Evet','Hayır',];
  sekil:string[]=['Evet','Hayır',];
  dialogBaslik: string;
  evil: Evilanim;
  islem: string;
  frm: FormGroup;

  /*İlan Detaylar */
  secisinma:Isinma[];
  kat:BKat[];
  yakitim:Yakit[];
  yapidur:Yapi[];
  yapt:YapiTipi[];
  durum:KDurumu[];
  tapular:Tapu[];
  sehirler:Il[]
  cepheler:Cephe[];
  /*İlan Detaylar */
  constructor(
    public dialogRef:MatDialogRef<EvilanlariDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route:ActivatedRoute,
  ) { 
    this.islem=data.islem;
    this.evil = data.kayit;
    if (this.islem=="ekle") {
      this.dialogBaslik="İlan Ekle";
      this.evil=new Evilanim();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="İlanı Düzenle";
      this.evil=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.IsinmaListe();
    this.BkatListe();
    this.yakitListe();
    this.yapidurumListe();
    this.yapitipiListe();
    this.KdurumListe();
    this.TapuListe();
    this.ShrListe();
    this.CphListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      ilanbasligi: [this.evil.ilanbasligi],
      ilanaciklama: [this.evil.ilanaciklama],
      satilikirami: [this.evil.satilikirami],
      Fiyat: [this.evil.Fiyat],
      odasayi: [this.evil.odasayi],
      salonsayi: [this.evil.salonsayi],
      banyosayi: [this.evil.banyosayi],
      brut: [this.evil.brut],
      net: [this.evil.net],
      EvIsinmaid: [this.evil.EvIsinmaid],
      binayas: [this.evil.binayas],
      Katid: [this.evil.Katid],
      binakatsayi: [this.evil.binakatsayi],
      kredi: [this.evil.kredi],
      goruntu: [this.evil.goruntu],
      konutsekil1: [this.evil.konutsekil1],
      esyali: [this.evil.esyali],
      EvYakid: [this.evil.EvYakid],
      EvYTid: [this.evil.EvYTid],
      EvYapid: [this.evil.EvYapid],
      EvKDid: [this.evil.EvKDid],
      aidat: [this.evil.aidat],
      takasmi: [this.evil.takasmi],
      sitemi: [this.evil.sitemi],
      EvCepheid: [this.evil.EvCepheid],
      EvTapid: [this.evil.EvTapid],
      kira: [this.evil.kira],
      Evsehirid: [this.evil.Evsehirid],
      ilcenere: [this.evil.ilcenere],
      mahnere: [this.evil.mahnere],
    });
  }
  IsinmaListe(){
    this.apiservis.IsiListe().subscribe((d:Isinma[])=>{
      this.secisinma=d;
    })
  }
  BkatListe(){
    this.apiservis.BkatListe().subscribe((d:BKat[])=>{
      this.kat=d;
    })
  }
  yakitListe(){
    this.apiservis.YakitListe().subscribe((d:Yakit[])=>{
      this.yakitim=d;
    })
  }
  yapidurumListe(){
    this.apiservis.YapiListe().subscribe((d:Yapi[])=>{
      this.yapidur=d;
    })
  }
  yapitipiListe(){
    this.apiservis.YapiTListe().subscribe((d:YapiTipi[])=>{
      this.yapt=d;
    })
  }
  KdurumListe(){
    this.apiservis.KDListe().subscribe((d:KDurumu[])=>{
      this.durum=d;
    })
  }
  TapuListe(){
    this.apiservis.TPListe().subscribe((d:Tapu[])=>{
      this.tapular=d;
    })
  }
  ShrListe(){
    this.apiservis.IlListe().subscribe((d:Il[])=>{
      this.sehirler=d;
    })
  }
  CphListe(){
    this.apiservis.CepheListe().subscribe((d:Cephe[])=>{
      this.cepheler=d;
    })
  }
}
