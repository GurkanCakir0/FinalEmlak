import { Yakit } from './../../../Models/Yakit';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-Yakit-dialog',
  templateUrl: './Yakit-dialog.component.html',
  styleUrls: ['./Yakit-dialog.component.scss']
})
export class YakitDialogComponent implements OnInit {
  dialogBaslik: string;
  yakitt: Yakit;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<YakitDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Yakıt Ekle";
      this.yakitt=new Yakit();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Yakıt Düzenle";
      this.yakitt=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      YTuru: [this.yakitt.YTuru]
    });
  }
}
