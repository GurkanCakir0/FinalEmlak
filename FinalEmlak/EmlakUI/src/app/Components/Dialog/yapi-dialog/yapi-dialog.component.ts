import { Yapi } from './../../../Models/Yapi';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-yapi-dialog',
  templateUrl: './yapi-dialog.component.html',
  styleUrls: ['./yapi-dialog.component.scss']
})
export class YapiDialogComponent implements OnInit {
  dialogBaslik: string;
  yapidur: Yapi;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<YapiDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Yapı Durumu Ekle";
      this.yapidur=new Yapi();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Yapı Durumu Düzenle";
      this.yapidur=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      YapDurumu: [this.yapidur.YapDurumu]
    });
  }
}
