using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Emlak.Models;
using Emlak.ViewModel;

namespace Emlak.Controllers
{ 
    public class ServiceController : ApiController
    {
        EDB1Entities7 db = new EDB1Entities7();
        Sonuc sonuc = new Sonuc();
        #region Uyelerim
        [HttpPost]
        [Route("api/uyeekle")]
        public Sonuc UyeEkle(UyeModel model)
        {
            if (db.Uyeler.Count(c => c.kadi == model.kadi || c.eposta==model.eposta)  > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Kayıtlıdır!";
                return sonuc;
            }

            Uyeler uyem = new Uyeler();
            uyem.uid = Guid.NewGuid().ToString();
            uyem.adsoyad = model.adsoyad;
            uyem.eposta = model.eposta;
            uyem.sifre = model.sifre;
            uyem.kadi = model.kadi;
            uyem.uyeadmin = model.uyeadmin;
            uyem.foto = model.foto;
            db.Uyeler.Add(uyem);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Başarıyla Kayıt Olundu";
            return sonuc;
        }
        [HttpGet]
        [Route("api/uyeList")]
        public List<UyeModel> UyeListe()
        {
            List<UyeModel> liste = db.Uyeler.Select(Uyelist => new UyeModel()
            {
                uid = Uyelist.uid,
                adsoyad = Uyelist.adsoyad,
                eposta = Uyelist.eposta,
                sifre = Uyelist.sifre,
                kadi = Uyelist.kadi,
                foto = Uyelist.foto,
        }).ToList();
            return liste;
        }
        [HttpDelete]
        [Route("api/uyesil/{uid}")]
        public Sonuc UyeSil(string uid)
        {
            Uyeler x = db.Uyeler.Where(s => s.uid == uid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üye Bulunamadı!";
                return sonuc;
            }
            if (db.Ilanlar.Count(s => s.Evuid == uid) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Üzerinde İlan Kayıtlı Üye Silinemez!";
                return sonuc;
            }

            db.Uyeler.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Silindi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/uyebyid/{uid}")]
        public UyeModel UyeById(string uid)
        {
            UyeModel kayit = db.Uyeler.Where(s => s.uid == uid).Select(x => new UyeModel()
            {
                uid = x.uid,
                adsoyad = x.adsoyad,
                eposta = x.eposta,
                sifre = x.sifre,
                kadi = x.kadi,
                uyeadmin = x.uyeadmin,
                foto = x.foto,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpPut]
        [Route("api/uyeduzenle")]
        public Sonuc UyeDuzenle(UyeModel model)
        {
            Uyeler uyem = db.Uyeler.Where(s => s.uid == model.uid).SingleOrDefault();

            if (uyem == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Uye Bulunamadı!";
                return sonuc;
            }

            uyem.adsoyad = model.adsoyad;
            uyem.eposta = model.eposta;
            uyem.sifre = model.sifre;
            uyem.kadi = model.kadi;
            uyem.uyeadmin = model.uyeadmin;
            uyem.foto = model.foto;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Üye Düzenlendi";
            return sonuc;
        }
        #endregion

        #region Uye Detay
        [HttpPost]
        [Route("api/ilekle")]
        public Sonuc IlEkle(IlModel model)
        {
            if (db.Iller.Count(c => c.il == model.il) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Şehir Kayıtlıdır!";
                return sonuc;
            }

            Iller sehir1 = new Iller();
            sehir1.il = model.il;
            db.Iller.Add(sehir1);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Şehir Başarıyla Kayıt Edildi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/ilduzenle")]
        public Sonuc IlDuzenle(IlModel model)
        {
            Iller il = db.Iller.Where(s => s.sehirid == model.sehirid).SingleOrDefault();

            if (il == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Şehir Bulunamadı!";
                return sonuc;
            }

            il.il = model.il;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Şehir Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/sehirliste")]
        public List<IlModel> IlListe()
        {
            List<IlModel> liste = db.Iller.Select(Illist => new IlModel()
            {
                sehirid = Illist.sehirid,
                il = Illist.il,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/sehirbyid/{sehirid}")]
        public IlModel SehirById(int sehirid)
        {
            IlModel kayit = db.Iller.Where(s => s.sehirid == sehirid).Select(x => new IlModel()
            {
                sehirid = x.sehirid,
                il = x.il,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/sehirsil/{sehirid}")]
        public Sonuc SehirSil(int sehirid)
        {
            Iller x = db.Iller.Where(s => s.sehirid == sehirid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Şehir Bulunamadı!";
                return sonuc;
            }
            db.Iller.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Şehir Silindi";
            return sonuc;
        }      
        #endregion

        #region İlanlar
        [HttpPost]
        [Route("api/evekle")]
        public Sonuc EVEkle(IlanModel model)
        {
            if (db.Ilanlar.Count(c => c.ilanbasligi == model.ilanbasligi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen İlan Daha Önce Yapılmıştır!";
                return sonuc;
            }

            Ilanlar yeni = new Ilanlar();
            yeni.Ilanid = Guid.NewGuid().ToString();
            yeni.ilanbasligi = model.ilanbasligi;
            yeni.ilanaciklama = model.ilanaciklama;
            yeni.Fiyat = model.Fiyat;
            yeni.odasayi = model.odasayi;
            yeni.salonsayi = model.salonsayi;
            yeni.banyosayi = model.banyosayi;
            yeni.brut = model.brut;
            yeni.net = model.net;
            yeni.EvIsinmaid = model.EvIsinmaid;
            yeni.binayas = model.binayas;
            yeni.Katid = model.Katid;
            yeni.binakatsayi = model.binakatsayi;
            yeni.konutsekil1 = model.konutsekil1;
            yeni.esyali = model.esyali;
            yeni.EvYakid = model.EvYakid;
            yeni.EvYapid = model.EvYapid;
            yeni.EvKDid = model.EvKDid;
            yeni.aidat = model.aidat;
            yeni.takasmi = model.takasmi;
            yeni.sitemi = model.sitemi;
            yeni.EvCepheid = model.EvCepheid;
            yeni.EvTapid = model.EvTapid;
            yeni.kira = model.kira;
            yeni.Evsehirid = model.Evsehirid;
            yeni.ilcenere = model.ilcenere;
            yeni.mahnere = model.mahnere;
            yeni.resim = model.resim;
            yeni.satilikirami = model.satilikirami;
            yeni.EvYTid = model.EvYTid;
            yeni.kredi = model.kredi;
            yeni.goruntu = model.goruntu;
            yeni.Evuid = model.Evuid;
            db.Ilanlar.Add(yeni);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Başarıyla İlan Oluştu";
            return sonuc;

        }
        [HttpGet]
        [Route("api/ilanList")]
        public List<IlanModel> IlanlarListe()
        {
            List<IlanModel> liste = db.Ilanlar.Select(Ilanlist => new IlanModel()
            {
                Ilanid = Ilanlist.Ilanid,
                ilanbasligi = Ilanlist.ilanbasligi,
                ilanaciklama = Ilanlist.ilanaciklama,
                Fiyat = Ilanlist.Fiyat,
                odasayi = Ilanlist.odasayi,
                salonsayi = Ilanlist.salonsayi,
                banyosayi = Ilanlist.banyosayi,
                brut = Ilanlist.brut,
                net = Ilanlist.net,
                EvIsinmaid = Ilanlist.EvIsinmaid,
                binayas = Ilanlist.binayas,
                Katid = Ilanlist.Katid,
                binakatsayi = Ilanlist.binakatsayi,
                konutsekil1 = Ilanlist.konutsekil1,
                esyali = Ilanlist.esyali,
                EvYakid = Ilanlist.EvYakid,
                EvYapid = Ilanlist.EvYapid,
                EvKDid = Ilanlist.EvKDid,
                aidat = Ilanlist.aidat,
                takasmi = Ilanlist.takasmi,
                sitemi = Ilanlist.sitemi,
                EvCepheid = Ilanlist.EvCepheid,
                EvTapid = Ilanlist.EvTapid,
                kira = Ilanlist.kira,
                Evsehirid = Ilanlist.Evsehirid,
                ilcenere = Ilanlist.ilcenere,
                mahnere = Ilanlist.mahnere,
                resim = Ilanlist.resim,
                satilikirami = Ilanlist.satilikirami,
                EvYTid = Ilanlist.EvYTid,
                kredi = Ilanlist.kredi,
                goruntu = Ilanlist.goruntu,
                Evuid = Ilanlist.Evuid,


            }).ToList();
            foreach (var kayit in liste)
            {
                kayit.Cephebilgi = CepheById(kayit.EvCepheid);
                kayit.Illerbilgi = SehirById(kayit.Evsehirid);
                kayit.Isinmabilgi = IsiById(kayit.EvIsinmaid);
                kayit.Katbilgi = KatById(kayit.Katid);
                kayit.Kullanimbilgi = KDById(kayit.EvKDid);
                kayit.Tapubilgi = TapuById(kayit.EvTapid);
                kayit.Yakitbilgi = YakitById(kayit.EvYakid);
                kayit.YTipibilgi = YTipById(kayit.EvYTid);
                kayit.Yapibilgi = YapiById(kayit.EvYapid);
                kayit.uyebilgi = UyeById(kayit.Evuid);
            }
            return liste;
        }
        [HttpGet]
        [Route("api/ilanlarListById/{Ilanid}")]
        public IlanModel IlanlarById(string ilanid)
        {
            IlanModel ilan1 = db.Ilanlar.Where(s => s.Ilanid == ilanid).Select(x => new IlanModel()
            {
                Ilanid = x.Ilanid,
                ilanbasligi = x.ilanbasligi,
                ilanaciklama = x.ilanaciklama,
                Fiyat = x.Fiyat,
                odasayi = x.odasayi,
                salonsayi = x.salonsayi,
                banyosayi = x.banyosayi,
                brut = x.brut,
                net = x.net,
                EvIsinmaid = x.EvIsinmaid,
                EvIsinma = x.Isinma.Itur,
                binayas = x.binayas,
                Katid = x.Katid,
                Katb = x.Kat.Bkat,
                binakatsayi = x.binakatsayi,
                konutsekil1 = x.konutsekil1,
                esyali = x.esyali,
                EvYakid = x.EvYakid,
                EvYakit=x.Yakit.YTuru,
                EvYapid = x.EvYapid,
                EvYapidb=x.Yapi.YapDurumu,
                EvKDid = x.EvKDid,
                EvKDidb=x.Kullanim.Durumu,
                aidat = x.aidat,
                takasmi = x.takasmi,
                sitemi = x.sitemi,
                EvCepheid = x.EvCepheid,
                EvCepheidb=x.Cephe.cyon,
                EvTapid = x.EvTapid,
                EvTapidb=x.Tapu.Tapum,
                kira = x.kira,
                Evsehirid = x.Evsehirid,
                Evsehiridb=x.Iller.il,
                ilcenere = x.ilcenere,
                mahnere = x.mahnere,
                resim = x.resim,
                satilikirami = x.satilikirami,
                EvYTid = x.EvYTid,
                EvYTidb=x.YTipi.Yapitipi,
                kredi = x.kredi,
                goruntu = x.goruntu,
                Evuid = x.Evuid,
                Evuidb=x.Uyeler.kadi,
            }).SingleOrDefault();
            return ilan1;
        }

        [HttpGet]
        [Route("api/ilanlarUyeListById/{Evuid}")]
        public List<IlanModel> IlanlarUyeById(string Evuid)
        {
            List<IlanModel>  ilan1 = db.Ilanlar.Where(s => s.Evuid == Evuid).Select(Ilanlist => new IlanModel()
            {
                Ilanid = Ilanlist.Ilanid,
                ilanbasligi = Ilanlist.ilanbasligi,
                ilanaciklama = Ilanlist.ilanaciklama,
                Fiyat = Ilanlist.Fiyat,
                odasayi = Ilanlist.odasayi,
                salonsayi = Ilanlist.salonsayi,
                banyosayi = Ilanlist.banyosayi,
                brut = Ilanlist.brut,
                net = Ilanlist.net,
                EvIsinmaid = Ilanlist.EvIsinmaid,
                binayas = Ilanlist.binayas,
                Katid = Ilanlist.Katid,
                binakatsayi = Ilanlist.binakatsayi,
                konutsekil1 = Ilanlist.konutsekil1,
                esyali = Ilanlist.esyali,
                EvYakid = Ilanlist.EvYakid,
                EvYapid = Ilanlist.EvYapid,
                EvKDid = Ilanlist.EvKDid,
                aidat = Ilanlist.aidat,
                takasmi = Ilanlist.takasmi,
                sitemi = Ilanlist.sitemi,
                EvCepheid = Ilanlist.EvCepheid,
                EvTapid = Ilanlist.EvTapid,
                kira = Ilanlist.kira,
                Evsehirid = Ilanlist.Evsehirid,
                ilcenere = Ilanlist.ilcenere,
                mahnere = Ilanlist.mahnere,
                resim = Ilanlist.resim,
                satilikirami = Ilanlist.satilikirami,
                EvYTid = Ilanlist.EvYTid,
                kredi = Ilanlist.kredi,
                goruntu = Ilanlist.goruntu,
                Evuid = Ilanlist.Evuid,
            }).ToList();
            foreach (var kayit in ilan1)
            {
                kayit.Cephebilgi = CepheById(kayit.EvCepheid);
                kayit.Illerbilgi = SehirById(kayit.Evsehirid);
                kayit.Isinmabilgi = IsiById(kayit.EvIsinmaid);
                kayit.Katbilgi = KatById(kayit.Katid);
                kayit.Kullanimbilgi = KDById(kayit.EvKDid);
                kayit.Tapubilgi = TapuById(kayit.EvTapid);
                kayit.Yakitbilgi = YakitById(kayit.EvYakid);
                kayit.YTipibilgi = YTipById(kayit.EvYTid);
                kayit.Yapibilgi = YapiById(kayit.EvYapid);
                kayit.uyebilgi = UyeById(kayit.Evuid);
            }

            return ilan1;
        }
        [HttpPut]
        [Route("api/ilanduzenle")]
        public Sonuc IlanDuzenle(IlanModel model)
        {
            Ilanlar ilanim = db.Ilanlar.Where(s => s.Ilanid == model.Ilanid).SingleOrDefault();

            if (ilanim == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlan Bulunamadı!";
                return sonuc;
            }

            ilanim.ilanbasligi = model.ilanbasligi;
            ilanim.ilanaciklama = model.ilanaciklama;
            ilanim.Fiyat = model.Fiyat;
            ilanim.odasayi = model.odasayi;
            ilanim.salonsayi = model.salonsayi;
            ilanim.banyosayi = model.banyosayi;
            ilanim.brut = model.brut;
            ilanim.net = model.net;
            ilanim.EvIsinmaid = model.EvIsinmaid;
            ilanim.binayas = model.binayas;
            ilanim.Katid = model.Katid;
            ilanim.binakatsayi = model.binakatsayi;
            ilanim.konutsekil1 = model.konutsekil1;
            ilanim.esyali = model.esyali;
            ilanim.EvYakid = model.EvYakid;
            ilanim.EvYapid = model.EvYapid;
            ilanim.EvKDid = model.EvKDid;
            ilanim.aidat = model.aidat;
            ilanim.takasmi = model.takasmi;
            ilanim.sitemi = model.sitemi;
            ilanim.EvCepheid = model.EvCepheid;
            ilanim.EvTapid = model.EvTapid;
            ilanim.kira = model.kira;
            ilanim.Evsehirid = model.Evsehirid;
            ilanim.ilcenere = model.ilcenere;
            ilanim.mahnere = model.mahnere;
            ilanim.satilikirami = model.satilikirami;
            ilanim.EvYTid = model.EvYTid;
            ilanim.resim = model.resim;
            ilanim.kredi = model.kredi;
            ilanim.goruntu = model.goruntu;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "İlan Düzenlendi";
            return sonuc;
        }
        [HttpDelete]
        [Route("api/ilansil/{Ilanid}")]
        public Sonuc IlanSil(string ilanid)
        {
            Ilanlar ilanim1 = db.Ilanlar.Where(s => s.Ilanid == ilanid).SingleOrDefault();

            if (ilanim1 == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "İlan Bulunamadı!";
                return sonuc;
            }

            db.Ilanlar.Remove(ilanim1);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "İlan Silindi";
            return sonuc;
        }
        #endregion

        #region İlanlar Detay
        [HttpPost]
        [Route("api/isiekle")]
        public Sonuc IsinmaEkle(Isinma1 model)
        {
            if (db.Isinma.Count(c => c.Itur == model.Itur) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Tür Kayıtlıdır!";
                return sonuc;
            }

            Isinma isi = new Isinma();
            isi.Itur = model.Itur;
            db.Isinma.Add(isi);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Isınma Türü Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/isiduzenle")]
        public Sonuc IsiDuzenle(Isinma1 model)
        {
            Isinma isinma = db.Isinma.Where(s => s.Isinmaid == model.Isinmaid).SingleOrDefault();

            if (isinma == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Isınma Türü Bulunamadı!";
                return sonuc;
            }

            isinma.Itur = model.Itur;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Isınma Türü Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/isiList")]
        public List<Isinma1> IsiListe()
        {
            List<Isinma1> liste = db.Isinma.Select(Ilist => new Isinma1()
            {
                Isinmaid = Ilist.Isinmaid,
                Itur = Ilist.Itur,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/isibyid/{Isinmaid}")]
        public Isinma1 IsiById(int Isinmaid)
        {
            Isinma1 kayit = db.Isinma.Where(s => s.Isinmaid == Isinmaid).Select(x => new Isinma1()
            {
                Isinmaid = x.Isinmaid,
                Itur = x.Itur,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/isisil/{Isinmaid}")]
        public Sonuc IsiSil(int Isinmaid)
        {
            Isinma x = db.Isinma.Where(s => s.Isinmaid == Isinmaid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Isınma Türü Bulunamadı!";
                return sonuc;
            }

            db.Isinma.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Isınma Türü Silindi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/katekle")]
        public Sonuc KatEkle(BKat model)
        {
            if (db.Kat.Count(c => c.Bkat == model.Bkat) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Kat Bulunmaktadır!";
                return sonuc;
            }

            Kat bkat = new Kat();
            bkat.Bkat = model.Bkat;
            db.Kat.Add(bkat);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kat Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpGet]
        [Route("api/katList")]
        public List<BKat> KatListe()
        {
            List<BKat> liste = db.Kat.Select(Katlist => new BKat()
            {
                Katid = Katlist.Katid,
                Bkat = Katlist.Bkat,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/katbyid/{Katid}")]
        public BKat KatById(int Katid)
        {
            BKat kayit = db.Kat.Where(s => s.Katid == Katid).Select(x => new BKat()
            {
                Katid = x.Katid,
                Bkat = x.Bkat,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/katsil/{Katid}")]
        public Sonuc KatSil(int Katid)
        {
            Kat x = db.Kat.Where(s => s.Katid == Katid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kat Türü Bulunamadı!";
                return sonuc;
            }

            db.Kat.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kat Türü Silindi";
            return sonuc;
        }
        [HttpPut]
        [Route("api/katduzenle")]
        public Sonuc KatDuzenle(BKat model)
        {
            Kat kkat = db.Kat.Where(s => s.Katid == model.Katid).SingleOrDefault();

            if (kkat == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Bulunduğu Kat Bulunamadı!";
                return sonuc;
            }

            kkat.Bkat = model.Bkat;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Bulunduğu Kat Düzenlendi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/cephekle")]
        public Sonuc CepheEkle(CepheModel model)
        {
            if (db.Cephe.Count(c => c.cyon == model.cyon) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Girilen Cephe Bulunmaktadır!";
                return sonuc;
            }

            Cephe cph = new Cephe();
            cph.cyon = model.cyon;
            db.Cephe.Add(cph);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cephe Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/cepheduzenle")]
        public Sonuc CepheDuzenle(CepheModel model)
        {
            Cephe cephem = db.Cephe.Where(s => s.Cepheid == model.Cepheid).SingleOrDefault();

            if (cephem == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cephe Bulunamadı!";
                return sonuc;
            }

            cephem.cyon = model.cyon;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cephe Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/cepheist")]
        public List<CepheModel> CepheListe()
        {
            List<CepheModel> liste = db.Cephe.Select(Ceplist => new CepheModel()
            {
                Cepheid = Ceplist.Cepheid,
                cyon = Ceplist.cyon,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/cephebyid/{Cepheid}")]
        public CepheModel CepheById(int Cepheid)
        {
            CepheModel kayit = db.Cephe.Where(s => s.Cepheid == Cepheid).Select(x => new CepheModel()
            {
                Cepheid = x.Cepheid,
                cyon = x.cyon,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/cephesil/{Cepheid}")]
        public Sonuc CepheSil(int cepheid)
        {
            Cephe x = db.Cephe.Where(s => s.Cepheid == cepheid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Cephe Türü Bulunamadı!";
                return sonuc;
            }

            db.Cephe.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Cephe Türü Silindi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/kdurumuekle")]
        public Sonuc KDurumuEkle(KDurumuModel model)
        {
            if (db.Kullanim.Count(c => c.Durumu == model.Durumu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanım Türü Kayıtlıdır!";
                return sonuc;
            }

            Kullanim kdm = new Kullanim();
            kdm.Durumu = model.Durumu;
            db.Kullanim.Add(kdm);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanım Durumu Türü Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/kdduzenle")]
        public Sonuc KDDuzenle(KDurumuModel model)
        {
            Kullanim kkdurumu = db.Kullanim.Where(s => s.KDid == model.KDid).SingleOrDefault();

            if (kkdurumu == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanım Durumu Bulunamadı!";
                return sonuc;
            }

            kkdurumu.Durumu = model.Durumu;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanım Durumu Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/kdlist")]
        public List<KDurumuModel> KDurumListe()
        {
            List<KDurumuModel> liste = db.Kullanim.Select(KullanımDlist => new KDurumuModel()
            {
                KDid = KullanımDlist.KDid,
                Durumu = KullanımDlist.Durumu,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/kdbyid/{KDid}")]
        public KDurumuModel KDById(int KDid)
        {
            KDurumuModel kayit = db.Kullanim.Where(s => s.KDid == KDid).Select(x => new KDurumuModel()
            {
                KDid = x.KDid,
                Durumu = x.Durumu,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/kuldsil/{KDid}")]
        public Sonuc KulDSil(int kdid)
        {
            Kullanim x = db.Kullanim.Where(s => s.KDid == kdid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kullanım Durumu Türü Bulunamadı!";
                return sonuc;
            }

            db.Kullanim.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Kullanım Durumu Türü Silindi";
            return sonuc;
        }   
        [HttpPost]
        [Route("api/tapusekle")]
        public Sonuc Tapuekle(TapuModel model)
        {
            if (db.Tapu.Count(c => c.Tapum == model.Tapum) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Tapu Türü Kayıtlıdır!";
                return sonuc;
            }

            Tapu tp = new Tapu();
            tp.Tapum = model.Tapum;
            db.Tapu.Add(tp);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Tapu Türü Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/tapuduzenle")]
        public Sonuc TapuDuzenle(TapuModel model)
        {
            Tapu tapum = db.Tapu.Where(s => s.Tapid == model.Tapid).SingleOrDefault();

            if (tapum == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Tapu Bulunamadı!";
                return sonuc;
            }

            tapum.Tapum = model.Tapum;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Tapu Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/tapulist")]
        public List<TapuModel> TapuListe()
        {
            List<TapuModel> liste = db.Tapu.Select(Taplist => new TapuModel()
            {
                Tapid = Taplist.Tapid,
                Tapum = Taplist.Tapum,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/tapubyid/{Tapid}")]
        public TapuModel TapuById(int Tapid)
        {
            TapuModel kayit = db.Tapu.Where(s => s.Tapid == Tapid).Select(x => new TapuModel()
            {
                Tapid = x.Tapid,
                Tapum = x.Tapum,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/tapusil/{Tapid}")]
        public Sonuc TapuSil(int Tapid)
        {
            Tapu x = db.Tapu.Where(s => s.Tapid == Tapid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Tapu Türü Bulunamadı!";
                return sonuc;
            }

            db.Tapu.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Tapu Türü Silindi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/yakitekle")]
        public Sonuc Yakitekle(YakitModel model)
        {
            if (db.Yakit.Count(c => c.YTuru == model.YTuru) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Türü Kayıtlıdır!";
                return sonuc;
            }

            Yakit yt = new Yakit();
            yt.YTuru = model.YTuru;
            db.Yakit.Add(yt);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yakıt Türü Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/yakitduzenle")]
        public Sonuc YakitDuzenle(YakitModel model)
        {
            Yakit yakitt = db.Yakit.Where(s => s.Yakid == model.Yakid).SingleOrDefault();

            if (yakitt == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Türü Bulunamadı!";
                return sonuc;
            }

            yakitt.YTuru = model.YTuru;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yakıt Türü Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/yakitlist")]
        public List<YakitModel> YakitListe()
        {
            List<YakitModel> liste = db.Yakit.Select(Yktlist => new YakitModel()
            {
                Yakid = Yktlist.Yakid,
                YTuru = Yktlist.YTuru,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yakitbyid/{Yakid}")]
        public YakitModel YakitById(int Yakid)
        {
            YakitModel kayit = db.Yakit.Where(s => s.Yakid == Yakid).Select(x => new YakitModel()
            {
                Yakid = x.Yakid,
                YTuru = x.YTuru,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/yakitsil/{Yakid}")]
        public Sonuc YakitSil(int Yakid)
        {
            Yakit x = db.Yakit.Where(s => s.Yakid == Yakid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yakıt Türü Bulunamadı!";
                return sonuc;
            }

            db.Yakit.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yakıt Türü Silindi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/yapitekle")]
        public Sonuc Yapiekle(YapiModel model)
        {
            if (db.Yapi.Count(c => c.YapDurumu == model.YapDurumu) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Durumu Kayıtlıdır!";
                return sonuc;
            }

            Yapi yp = new Yapi();
            yp.YapDurumu = model.YapDurumu;
            db.Yapi.Add(yp);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Durumu Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/yapiduzenle")]
        public Sonuc YapiduDuzenle(YapiModel model)
        {
            Yapi yapidur = db.Yapi.Where(s => s.Yapid == model.Yapid).SingleOrDefault();

            if (yapidur == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Durumu Bulunamadı!";
                return sonuc;
            }

            yapidur.YapDurumu = model.YapDurumu;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Durumu Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/yapilist")]
        public List<YapiModel> YapiListe()
        {
            List<YapiModel> liste = db.Yapi.Select(Yapilist => new YapiModel()
            {
                Yapid = Yapilist.Yapid,
                YapDurumu = Yapilist.YapDurumu,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yapibyid/{Yapid}")]
        public YapiModel YapiById(int Yapid)
        {
            YapiModel kayit = db.Yapi.Where(s => s.Yapid == Yapid).Select(x => new YapiModel()
            {
                Yapid = x.Yapid,
                YapDurumu = x.YapDurumu,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/yapisil/{Yapid}")]
        public Sonuc YapiSil(int Yapid)
        {
            Yapi x = db.Yapi.Where(s => s.Yapid == Yapid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Türü Bulunamadı!";
                return sonuc;
            }

            db.Yapi.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Türü Silindi";
            return sonuc;
        }
        [HttpPost]
        [Route("api/ytipiekle")]
        public Sonuc YTipiekle(YTipiModel model)
        {
            if (db.YTipi.Count(c => c.Yapitipi == model.Yapitipi) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Tipi Kayıtlıdır!";
                return sonuc;
            }

            YTipi yt = new YTipi();
            yt.Yapitipi = model.Yapitipi;
            db.YTipi.Add(yt);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Tipi Başarıyla Kayıt Edildi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/yapitduzenle")]
        public Sonuc YapitipDuzenle(YTipiModel model)
        {
            YTipi ytipi = db.YTipi.Where(s => s.YTid == model.YTid).SingleOrDefault();

            if (ytipi == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Tipi Bulunamadı!";
                return sonuc;
            }

            ytipi.Yapitipi = model.Yapitipi;
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Tipi Düzenlendi";
            return sonuc;
        }
        [HttpGet]
        [Route("api/yapitlist")]
        public List<YTipiModel> YapiTListe()
        {
            List<YTipiModel> liste = db.YTipi.Select(YTipilist => new YTipiModel()
            {
                YTid = YTipilist.YTid,
                Yapitipi = YTipilist.Yapitipi,
            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/ytipbyid/{YTid}")]
        public YTipiModel YTipById(int YTid)
        {
            YTipiModel kayit = db.YTipi.Where(s => s.YTid == YTid).Select(x => new YTipiModel()
            {
                YTid = x.YTid,
                Yapitipi = x.Yapitipi,
            }).SingleOrDefault();
            return kayit;
        }
        [HttpDelete]
        [Route("api/yapitipisil/{YTid}")]
        public Sonuc YapiTipiSil(int ytid)
        {
            YTipi x = db.YTipi.Where(s => s.YTid == ytid).SingleOrDefault();

            if (x == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Yapı Tipi Bulunamadı!";
                return sonuc;
            }

            db.YTipi.Remove(x);
            db.SaveChanges();
            sonuc.islem = true;
            sonuc.mesaj = "Yapı Tipi Silindi";
            return sonuc;
        }
        #endregion

        #region Yorumlar
        [HttpGet]
        [Route("api/yorumliste")]
        public List<YorumModel> YorumListe()
        {
            List<YorumModel> liste = db.Yorumlar.Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                Ilanid = x.Ilanid,
                uid = x.uid,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uyeler.kadi,
                IlanBaslik = x.Ilanlar.ilanbasligi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistebyuyeid/{uid}")]
        public List<YorumModel> YorumListeByUyeId(string uid)
        {
            List<YorumModel> liste = db.Yorumlar.Where(s => s.uid == uid).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                Ilanid = x.Ilanid,
                uid =x.uid,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uyeler.kadi,
                IlanBaslik = x.Ilanlar.ilanbasligi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistebyevid/{Ilanid}")]
        public List<YorumModel> YorumListeBymakaleId(string Ilanid)
        {
            List<YorumModel> liste = db.Yorumlar.Where(s => s.Ilanid == Ilanid).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                Ilanid = x.Ilanid,
                uid = x.uid,

                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uyeler.kadi,
                IlanBaslik = x.Ilanlar.ilanbasligi,

            }).ToList();
            return liste;
        }
        [HttpGet]
        [Route("api/yorumlistesoneklenenler/{s}")]
        public List<YorumModel> YorumListeSonEklenenler(int s)
        {
            List<YorumModel> liste = db.Yorumlar.OrderByDescending(o => o.Ilanid).Take(s).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                Ilanid = x.Ilanid,
                uid = x.uid,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uyeler.kadi,
                IlanBaslik = x.Ilanlar.ilanbasligi,

            }).ToList();
            return liste;
        }


        [HttpGet]
        [Route("api/yorumbyid/{yorumId}")]

        public YorumModel YorumById(int yorumId)
        {
            YorumModel kayit = db.Yorumlar.Where(s => s.YorumId == yorumId).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                Ilanid = x.Ilanid,
                uid = x.uid,
                Tarih = (System.DateTime)x.Tarih,
                KullaniciAdi = x.Uyeler.kadi,
                IlanBaslik = x.Ilanlar.ilanbasligi,
            }).SingleOrDefault();

            return kayit;
        }

        [HttpPost]
        [Route("api/yorumekle")]
        public Sonuc YorumEkle(YorumModel model)
        {
            if (db.Yorumlar.Count(s => s.uid == model.uid && s.Ilanid == model.Ilanid && s.YorumIcerik == model.YorumIcerik) > 0)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Aynı Kişi, Aynı Makaleye Aynı Yorumu Yapamaz!";
                return sonuc;
            }

            Yorumlar yeni = new Yorumlar();
            yeni.YorumIcerik = model.YorumIcerik;
            yeni.Ilanid = model.Ilanid;
            yeni.uid = model.uid;
            yeni.Tarih = model.Tarih;
            db.Yorumlar.Add(yeni);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Eklendi";

            return sonuc;
        }
        [HttpPut]
        [Route("api/yorumduzenle")]
        public Sonuc YorumDuzenle(YorumModel model)
        {

            Yorumlar kayit = db.Yorumlar.Where(s => s.YorumId == model.YorumId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            kayit.YorumId = model.YorumId;
            kayit.YorumIcerik = model.YorumIcerik;
            kayit.Ilanid = model.Ilanid;
            kayit.uid = model.uid;
            kayit.Tarih = model.Tarih;

            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Düzenlendi";

            return sonuc;
        }

        [HttpDelete]
        [Route("api/yorumsil/{yorumId}")]
        public Sonuc YorumSil(int yorumId)
        {
            Yorumlar kayit = db.Yorumlar.Where(s => s.YorumId == yorumId).SingleOrDefault();

            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!";
                return sonuc;
            }

            db.Yorumlar.Remove(kayit);
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Yorum Silindi";

            return sonuc;
        }

        #endregion

        #region Foto
        [HttpPost]
        [Route("api/Uyefotoguncelle")]
        public Sonuc UyeFotografGuncelle(FotoModel model)
        {
            Uyeler foto = db.Uyeler.Where(s => s.uid == model.uid).SingleOrDefault();
            if (foto == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }
            if (foto.foto != "profil.png")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + foto.foto);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgBytes = Convert.FromBase64String(base64);
            string dosyaAdi = foto.uid + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            foto.foto = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotograf Güncellendi";

            return sonuc;
        }
        [HttpPost]
        [Route("api/ilanfotoguncelle")]
        public Sonuc IlanFotografGuncelle(EvFotoModel model)
        {
            Ilanlar uyefot = db.Ilanlar.Where(s => s.Ilanid == model.Ilanid).SingleOrDefault();
            if (uyefot == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunmadı!";
                return sonuc;
            }
            if (uyefot.resim != "home.png")
            {
                string yol = System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + uyefot.resim);
                if (File.Exists(yol))
                {
                    File.Delete(yol);
                }
            }

            string data = model.fotoData;
            string base64 = data.Substring(data.IndexOf(',') + 1);
            base64 = base64.Trim('\0');
            byte[] imgBytes = Convert.FromBase64String(base64);
            string dosyaAdi = uyefot.Ilanid + model.fotoUzanti.Replace("image/", ".");
            using (var ms = new MemoryStream(imgBytes, 0, imgBytes.Length))
            {
                Image img = Image.FromStream(ms, true);
                img.Save(System.Web.Hosting.HostingEnvironment.MapPath("~/Dosyalar/" + dosyaAdi));
            }
            uyefot.resim = dosyaAdi;
            db.SaveChanges();

            sonuc.islem = true;
            sonuc.mesaj = "Fotograf Güncellendi";

            return sonuc;
        }
        #endregion

    }
}