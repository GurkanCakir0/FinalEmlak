import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Tapu } from './../../../Models/Tapu';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-tapu-dialog',
  templateUrl: './tapu-dialog.component.html',
  styleUrls: ['./tapu-dialog.component.scss']
})
export class TapuDialogComponent implements OnInit {
  dialogBaslik: string;
  tapu: Tapu;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<TapuDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data:any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Tapu Durumu Ekle";
      this.tapu=new Tapu();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Tapu Durumu Düzenle";
      this.tapu=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      Tapum: [this.tapu.Tapum]
    });
  }
}
