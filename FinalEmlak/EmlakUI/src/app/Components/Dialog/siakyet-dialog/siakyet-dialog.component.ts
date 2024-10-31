import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { sikayetim } from 'src/app/Models/sikayet';
import { KDurumu } from 'src/app/Models/Kdurumu';
import { KdDialogComponent } from '../Kd-dialog/Kd-dialog.component';

@Component({
  selector: 'app-siakyet-dialog',
  templateUrl: './siakyet-dialog.component.html',
  styleUrls: ['./siakyet-dialog.component.css']
})
export class SiakyetDialogComponent implements OnInit {
  dialogBaslik: string;
  skyt: sikayetim;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<KdDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Şikayet Ekle";
      this.skyt=new sikayetim();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Şikayet Düzenle";
      this.skyt=data.kayit;
    }
    this.frm=this.FormOlustur();}

  ngOnInit() {
    
  }
  FormOlustur(){
    return this.frmBuild.group({
      Suyeid: [this.skyt.Suyeid],
      Silanid: [this.skyt.Silanid],
      sikayeticerik: [this.skyt.sikayeticerik],
      tarih: [this.skyt.tarih],
    });
  }
}
