import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { YapiTipi } from './../../../Models/Ytipi';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-yapitipi-dialog',
  templateUrl: './yapitipi-dialog.component.html',
  styleUrls: ['./yapitipi-dialog.component.scss']
})
export class YapitipiDialogComponent implements OnInit {
  dialogBaslik: string;
  yapitip: YapiTipi;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<YapitipiDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Yapı Tipi Ekle";
      this.yapitip=new YapiTipi();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Yapı Tipi Düzenle";
      this.yapitip=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      Yapitipi: [this.yapitip.Yapitipi]
    });
  }
}
