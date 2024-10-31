import { Il } from './../../../Models/Il';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sehir-dialog',
  templateUrl: './sehir-dialog.component.html',
  styleUrls: ['./sehir-dialog.component.scss']
})
export class SehirDialogComponent implements OnInit {
  dialogBaslik: string;
  ilim: Il;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<SehirDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data: any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Şehir Ekle";
      this.ilim=new Il();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Şehir Düzenle";
      this.ilim=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      il: [this.ilim.il]
    });
  }
}
