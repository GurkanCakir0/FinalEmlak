import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cephe } from './../../../Models/Cephe';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cephe-dialog',
  templateUrl: './cephe-dialog.component.html',
  styleUrls: ['./cephe-dialog.component.scss']
})
export class CepheDialogComponent implements OnInit {
  dialogBaslik: string;
  ycephe: Cephe;
  islem: string;
  frm: FormGroup;
  constructor(
   public dialogRef:MatDialogRef<CepheDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem=="ekle") {
      this.dialogBaslik="Cephe Ekle";
      this.ycephe=new Cephe();
    }
    if (this.islem=="duzenle") {
      this.dialogBaslik="Cephe Düzenle";
      this.ycephe=data.kayit;
    }
    this.frm=this.FormOlustur();
  }
  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      cyon: [this.ycephe.cyon]
    });
  }
}
