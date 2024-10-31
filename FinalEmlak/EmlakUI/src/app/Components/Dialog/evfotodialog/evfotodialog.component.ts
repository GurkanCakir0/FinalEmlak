import { Evilanim } from './../../../Models/Evilanim';
import { EvFoto } from './../../../Models/evfoto';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UyeFoto } from 'src/app/Models/Foto';
import { Uyeler } from 'src/app/Models/Uyeler';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';

@Component({
  selector: 'app-evfotodialog',
  templateUrl: './evfotodialog.component.html',
  styleUrls: ['./evfotodialog.component.scss']
})
export class EvfotodialogComponent implements OnInit {
  secilenFoto: any;
  evFoto: EvFoto = new EvFoto();
  secev: Evilanim;
  constructor(
    public dialogRef: MatDialogRef<EvfotodialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiServiceService
  ) { 
    this.secev = this.data;
  }

  ngOnInit() {
  }
  FotoSec(e: any) {
    var fotolar = e.target.files;
    var foto = fotolar[0];
    var fr = new FileReader();
    fr.onload = () => {
      this.secilenFoto = fr.result,
        this.evFoto.fotoData = fr.result.toString(),
        this.evFoto.fotoUzanti = foto.type
    }
    fr.readAsDataURL(foto);
  }
}
