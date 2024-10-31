import { Uyeler } from './../../../Models/Uyeler';
import { ApiServiceService } from './../../../Service/Api-Service.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UyeFoto } from 'src/app/Models/Foto';

@Component({
  selector: 'app-foto-dialog',
  templateUrl: './foto-dialog.component.html',
  styleUrls: ['./foto-dialog.component.scss']
})
export class FotoDialogComponent implements OnInit {
  secilenFoto: any;
  uyemFoto: UyeFoto = new UyeFoto();
  secuyem: Uyeler;
  constructor(
    public dialogRef: MatDialogRef<FotoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiServiceService
  ) {

    this.secuyem = this.data;
   }

  ngOnInit() {
  }
  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onload = () => {
      this.secilenFoto = fr.result,
        this.uyemFoto.fotoData = fr.result.toString(),
        this.uyemFoto.fotoUzanti = foto.type
    }
    fr.readAsDataURL(foto);
  }
}
