import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { KDurumu } from './../../../Models/Kdurumu';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-Kd-dialog',
  templateUrl: './Kd-dialog.component.html',
  styleUrls: ['./Kd-dialog.component.css']
})
export class KdDialogComponent implements OnInit {
  dialogBaslik: string;
  kuld: KDurumu;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<KdDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Kullanım Durumu Ekle";
      this.kuld=new KDurumu();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Kullanım Durumu Düzenle";
      this.kuld=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      Durumu: [this.kuld.Durumu]
    });
  }
}
