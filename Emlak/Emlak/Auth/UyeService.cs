using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Emlak.Models;
using Emlak.ViewModel;

namespace Emlak.Auth
{
    public class UyeService
    {
        EDB1Entities7 db = new EDB1Entities7();

        public UyeModel UyeOturumAc(string kadi, string sifre)
        {
            UyeModel uye = db.Uyeler.Where(s => s.kadi == kadi && s.sifre == sifre).Select(x => new UyeModel()
            {
                uid = x.uid,
                adsoyad = x.adsoyad,
                eposta = x.eposta,
                kadi = x.kadi,
                
                sifre = x.sifre,
                uyeadmin = x.uyeadmin
            }).SingleOrDefault();
            return uye;

        }
    }
}