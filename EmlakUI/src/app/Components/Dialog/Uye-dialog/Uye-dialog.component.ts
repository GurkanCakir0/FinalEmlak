import { Uyeler } from './../../../Models/Uyeler';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Uye-dialog',
  templateUrl: './Uye-dialog.component.html',
  styleUrls: ['./Uye-dialog.component.scss']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Uyeler;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public frmBuild: FormBuilder
  ) { 
    this.islem = data.islem;
    this.yeniKayit = data.kayit;
    if (this.islem == 'ekle') {
      this.dialogBaslik = "Uye OL"
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Kat Düzenle";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur() {
    return this.frmBuild.group({
      adsoyad: [this.yeniKayit.adsoyad],
      eposta: [this.yeniKayit.eposta],
      kadi: [this.yeniKayit.kadi],
      sifre: [this.yeniKayit.sifre],
      uyeadmin: [this.yeniKayit.uyeadmin],
    });
  }
}
