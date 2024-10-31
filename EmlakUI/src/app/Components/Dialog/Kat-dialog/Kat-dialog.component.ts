import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BKat } from './../../../Models/Kat';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-Kat-dialog',
  templateUrl: './Kat-dialog.component.html',
  styleUrls: ['./Kat-dialog.component.css']
})
export class KatDialogComponent implements OnInit {
  dialogBaslik: string;
  bulundkat: BKat;
  islem: string;
  frm: FormGroup;
  constructor(
    public dialogRef:MatDialogRef<KatDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Kat Ekle";
      this.bulundkat=new BKat();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Kat Düzenle";
      this.bulundkat=data.kayit;
    }
    this.frm=this.FormOlustur();
   }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      Bkat: [this.bulundkat.Bkat]
    });
  }
}
