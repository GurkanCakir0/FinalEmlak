import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Isinma } from './../../../Models/Isinma';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-Isi-dialog',
  templateUrl: './Isi-dialog.component.html',
  styleUrls: ['./Isi-dialog.component.css']
})
export class IsiDialogComponent implements OnInit {
  dialogBaslik: string;
  yisi: Isinma;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<IsiDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Isı Türü Ekle";
      this.yisi=new Isinma();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Isı Türü Düzenle";
      this.yisi=data.kayit;
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      Itur: [this.yisi.Itur]
    });
  }
}
