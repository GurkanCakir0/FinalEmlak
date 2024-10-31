import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Evilanim } from 'src/app/Models/Evilanim';
import { ApiServiceService } from 'src/app/Service/Api-Service.service';
import { EAlertService } from 'src/app/Service/EAlert.service';
import { ConfirmDialogComponent } from '../Dialog/Confirm-dialog/Confirm-dialog.component';
import { EvilanlariDialogComponent } from '../Dialog/evilanlari-dialog/evilanlari-dialog.component';

@Component({
  selector: 'app-AnasayfaC',
  templateUrl: './AnasayfaC.component.html',
  styleUrls: ['./AnasayfaC.component.css']
})
export class AnasayfaCComponent implements OnInit {
  panelOpenState = false;
  datasource: any;
  evim:Evilanim[];
  satilikirami:Evilanim[];
  displayedColumns= ['ilanbasligi','ilanaciklama','satilikirami','ilnere','cepheyon','Fiyat',];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogref:MatDialogRef<EvilanlariDialogComponent>;
  dialogRefConfirm:MatDialogRef<ConfirmDialogComponent>
  constructor(
    public apiservis:ApiServiceService,
    public matDialog:MatDialog,
    public alert:EAlertService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.UrunListele();
  }
  slides = [
    {'image': 'assets/slider/img1.jpg'}, 
    {'image': 'assets/slider/img2.jpg'},
    {'image': 'assets/slider/img3.jpg'}, 
  ];
  EVListe(){
    this.apiservis.EvListe().subscribe((d: Evilanim[])=>{
        this.evim = d;
        this.datasource=new MatTableDataSource(d);
        this.datasource.sort=this.sort;
        this.datasource.paginator=this.paginator;
    });
  }
  UrunListele() {
    this.apiservis.EvListe().subscribe((d: Evilanim[]) => {
      this.evim = d;
    })
  }
}
