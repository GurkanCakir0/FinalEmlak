import { Yorum } from './../Models/Yorum';
import { EvFoto } from './../Models/evfoto';
import { sikayetim } from './../Models/sikayet';
import { Sonuc } from './../Models/Sonuc';
import { UyeFoto } from 'src/app/Models/Foto';
import { Evilanim } from '../Models/Evilanim';
import { YapiTipi } from './../Models/Ytipi';
import { Yapi } from './../Models/Yapi';
import { Yakit } from './../Models/Yakit';
import { Tapu } from './../Models/Tapu';
import { KDurumu } from './../Models/Kdurumu';
import { BKat } from './../Models/Kat';
import { Isinma } from './../Models/Isinma';
import { Uyeler } from './../Models/Uyeler';
import { Il } from './../Models/Il';
import { Cephe } from './../Models/Cephe';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
apiUrl="https://localhost:44383/api/"
siteUrl="https://localhost:44383/"
constructor(
  public http: HttpClient
) { }

tokenAl(kadi: string, parola: string) {
  var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
  var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
  return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
}
OturumK(){
  if (localStorage.getItem("token")) {
    return true;
  }
  else{
    return false;
  }
}
yetkiKontrol(yetkiler: any[]) {
  var sonuc: boolean = false;

  var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("Yetki"));

  if (uyeYetkiler) {
    yetkiler.forEach(element => {
      if (uyeYetkiler.indexOf(element) > -1) {
        sonuc = true;
      }
    });
  }

  return sonuc;
}
/* APİ  */
/* Api İlanlar Detayları Başlangıç */

/*Cephe Başlangıç */
CepheListe(){
  return this.http.get(this.apiUrl +"/cepheist");
}
CepheEkle(cephem:Cephe){
  return this.http.post(this.apiUrl +"/cephekle",cephem);
}
CepheSil(cepheid:string){
  return this.http.delete(this.apiUrl +"/cephesil/"+cepheid);
}
CepheDuzenle(cephem:Cephe){
  return this.http.put(this.apiUrl +"/cepheduzenle",cephem);
}
CepheByid(cepheid:string){
  return this.http.get(this.apiUrl +"/cephebyid/"+cepheid);
}
/*Cephe Bitiş */

/*Isınma Türü Başlangıç */
IsiListe(){
  return this.http.get(this.apiUrl +"/isiList");
}
IsiEkle(Isin:Isinma){
  return this.http.post(this.apiUrl +"/isiekle",Isin);
}
IsiSil(Isinmaid:string){
  return this.http.delete(this.apiUrl +"/isisil/"+Isinmaid);
}
IsilarDuzenle(Itur:Isinma){
  return this.http.put(this.apiUrl +"/isiduzenle",Itur);
}
IsiByid(Isinmaid:string){
  return this.http.get(this.apiUrl +"/isibyid/"+Isinmaid);
}
/*Isınma Türü Bitiş */

/*Bulunduğu Kat Başlangıç */
BkatListe(){
  return this.http.get(this.apiUrl +"/katList");
}
BkatEkle(kkat:BKat){
  return this.http.post(this.apiUrl +"/katekle",kkat);
}
BkatSil(Katid:string){
  return this.http.delete(this.apiUrl +"/katsil/"+Katid);
}
BkatlarDuzenle(Bkat:BKat){
  return this.http.put(this.apiUrl +"/katduzenle",Bkat);
}
KTByid(Katid:string){
  return this.http.get(this.apiUrl +"/katbyid/"+Katid);
}
/*Bulunduğu Kat Bitiş */

/*Kullanım Durumu Başlangıç */
KDListe(){
  return this.http.get(this.apiUrl +"/kdlist");
}
KDEkle(kD:KDurumu){
  return this.http.post(this.apiUrl +"/kdurumuekle",kD);
}
KDSil(KDid:string){
  return this.http.delete(this.apiUrl +"/kuldsil/"+KDid);
}
KDuzenle(Durumu:KDurumu){
  return this.http.put(this.apiUrl +"/kdduzenle",Durumu);
}
KDuByid(KDid:string){
  return this.http.get(this.apiUrl +"/kdbyid/"+KDid);
}
/*Kullanım Durumu Bitiş */

/* Tapu Başlangıç */
TPListe(){
  return this.http.get(this.apiUrl +"/tapulist");
}
TPEkle(tp:Tapu){
  return this.http.post(this.apiUrl +"/tapusekle",tp);
}
TPSil(Tapid:string){
  return this.http.delete(this.apiUrl +"/tapusil/"+Tapid);
}
TPDuzenle(Tpd:Tapu){
  return this.http.put(this.apiUrl +"/tapuduzenle",Tpd);
}
TPByid(Tapid:string){
  return this.http.get(this.apiUrl +"/tapubyid/"+Tapid);
}
/* Tapu Bitiş */

/*Yakıt Tipi Başlangıç*/
YakitListe(){
  return this.http.get(this.apiUrl +"/yakitlist");
}
YakitEkle(ykt:Yakit){
  return this.http.post(this.apiUrl +"/yakitekle",ykt);
}
YakitSil(Yakid:string){
  return this.http.delete(this.apiUrl +"/yakitsil/"+Yakid);
}
YakitDuzenle(ykt:Yakit){
  return this.http.put(this.apiUrl +"/yakitduzenle",ykt);
}
YakitByid(Yakid:string){
  return this.http.get(this.apiUrl +"/yakitbyid/"+Yakid);
}
/*Yakıt Tipi Bitiş*/

/*Yapı Durumu Başlangıç*/
YapiListe(){
  return this.http.get(this.apiUrl +"/yapilist");
}
YapiEkle(ypt:Yapi){
  return this.http.post(this.apiUrl +"/yapitekle",ypt);
}
YapiSil(Yapid:string){
  return this.http.delete(this.apiUrl +"/yapisil/"+Yapid);
}
YapiDuzenle(ypt:Yapi){
  return this.http.put(this.apiUrl +"/yapiduzenle",ypt);
}
YapiDByid(Yapid:string){
  return this.http.get(this.apiUrl +"/yapibyid/"+Yapid);
}
/*Yapı Durumu Bitiş*/

/*Yapı Tipi Başlangıç*/
YapiTListe(){
  return this.http.get(this.apiUrl +"/yapitlist");
}
YapiTEkle(yapit:YapiTipi){
  return this.http.post(this.apiUrl +"/ytipiekle",yapit);
}
YapiTSil(YTid:string){
  return this.http.delete(this.apiUrl +"/yapitipisil/"+YTid);
}
YapiTDuzenle(yapit:YapiTipi){
  return this.http.put(this.apiUrl +"/yapitduzenle",yapit);
}
YapiTByid(YTid:string){
  return this.http.get(this.apiUrl +"/ytipbyid/"+YTid);
}
/*Yapı Tipi Bitiş*/

/*İl Başlangıç */
IlListe(){
  return this.http.get(this.apiUrl +"/sehirliste");
}
IleEkle(il:Il){
  return this.http.post(this.apiUrl +"/ilekle",il);
}
IlSil(ilid:string){
  return this.http.delete(this.apiUrl +"/sehirsil/"+ilid);
}
IlDuzenle(sehir:Il){
  return this.http.put(this.apiUrl +"/ilduzenle",sehir);
}
SehirByid(sehirid:string){
  return this.http.get(this.apiUrl +"/sehirbyid/"+sehirid);
}
/*İl Bitiş */

/* Api İlanlar Detayları Bitiş */

/* Api İlan Verme Başlangıç */
EvListe(){
  return this.http.get(this.apiUrl +"/ilanList");
}
EvEkle(ev:Evilanim){
  return this.http.post(this.apiUrl +"/evekle",ev);
}
EvSil(Ilanid:string){
  return this.http.delete(this.apiUrl +"/ilansil/"+Ilanid);
}
EvDuzenle(ev:Evilanim){
  return this.http.put(this.apiUrl +"/ilanduzenle",ev);
}
EvByid(Ilanid:string){
  return this.http.get(this.apiUrl +"/ilanlarListById/"+Ilanid);
}
EvListeByUyeId(Evuid: string) {
  return this.http.get(this.apiUrl + "/ilanlarUyeListById/" + Evuid);
}
EvFoto(evfoto: EvFoto) {
  return this.http.post<Sonuc>(this.apiUrl + "/ilanfotoguncelle", evfoto);
}
/* Api İlan Verme Bitiş */

UyeListe(){
  return this.http.get(this.apiUrl +"/uyeList");
}
UyeEkle(uyem:Uyeler){
  return this.http.post(this.apiUrl +"/uyeekle",uyem);
}
UyeSil(cepid:string){
  return this.http.delete(this.apiUrl +"/uyesil/"+cepid);
}
UyeDuzenle(uye:Uyeler){
  return this.http.put(this.apiUrl +"/uyeduzenle",uye);
}
UyeByid(uid:string){
  return this.http.get(this.apiUrl +"/uyebyid/"+uid);
}
UyeFoto(uyeFoto: UyeFoto) {
  return this.http.post<Sonuc>(this.apiUrl + "/Uyefotoguncelle", uyeFoto);
}

sikayetEkle(skyt:sikayetim){
  return this.http.post(this.apiUrl +"/sikayetekle",skyt);
}


YorumListe() {
  return this.http.get(this.apiUrl + "/yorumliste");
}
YorumListeByUyeId(uid: string) {
  return this.http.get(this.apiUrl + "/yorumlistebyuyeid/" + uid);
}
YorumListeEvId(Ilanid: string) {
  return this.http.get(this.apiUrl + "/yorumlistebyevid/" + Ilanid);
}
YorumById(yorumId: number) {
  return this.http.get(this.apiUrl + "/yorumbyid/" + yorumId);
}
YorumEkle(yorum: Yorum) {
  return this.http.post(this.apiUrl + "/yorumekle", yorum);
}
YorumDuzenle(yorum: Yorum) {
  return this.http.put(this.apiUrl + "/yorumduzenle", yorum);
}
YorumSil(yorumId: number) {
  return this.http.delete(this.apiUrl + "/yorumsil/" + yorumId);
}
/*APİ BİTİŞ */



}
