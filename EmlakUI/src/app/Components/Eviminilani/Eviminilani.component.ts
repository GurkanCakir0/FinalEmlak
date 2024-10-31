import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Evilanim } from 'src/app/Models/Evilanim';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { EAlertService } from 'src/app/Service/EAlert.service';
import { ConfirmDialogComponent } from '../Dialog/Confirm-dialog/Confirm-dialog.component';
import { EvilanlariDialogComponent } from '../Dialog/evilanlari-dialog/evilanlari-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Eviminilani',
  templateUrl: './Eviminilani.component.html',
  styleUrls: ['./Eviminilani.component.scss']
})
export class EviminilaniComponent implements OnInit {
  x:any;
  panelOpenState = false;
  datasource: any;
  evim:Evilanim[];
  satilikirami:Evilanim[];

  public books:any;
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.EVListe();
  }
  EVListe(){
    this.apiservis.EvListe().subscribe((d: Evilanim[])=>{
        this.evim = d;
        this.datasource=new MatTableDataSource(d);
    });
  }
  Filterele(e: any) {
    var deger = e.target.value;
    this.datasource.filter = deger("Satılık");
    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
