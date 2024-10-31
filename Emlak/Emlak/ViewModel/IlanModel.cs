using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Emlak.ViewModel
{
    public class IlanModel
    {
        public string Ilanid { get; set; }
        public string ilanbasligi { get; set; }
        public string ilanaciklama { get; set; }
        public decimal Fiyat { get; set; }
        public int odasayi { get; set; }
        public int salonsayi { get; set; }
        public int banyosayi { get; set; }
        public double brut { get; set; }
        public int net { get; set; }
        public int EvIsinmaid { get; set; }
        public string EvIsinma { get; set; }
        public int binayas { get; set; }
        public int Katid { get; set; }
        public string Katb { get; set; }
        public int binakatsayi { get; set; }
        public string konutsekil1 { get; set; }
        public string esyali { get; set; }
        public int EvYakid { get; set; }
        public string EvYakit { get; set; }
        public int EvYapid { get; set; }
        public string EvYapidb { get; set; }
        public int EvKDid { get; set; }
        public string EvKDidb { get; set; }
        public decimal aidat { get; set; }
        public string takasmi { get; set; }
        public string sitemi { get; set; }
        public int EvCepheid { get; set; }
        public string EvCepheidb { get; set; }
        public int EvTapid { get; set; }
        public string EvTapidb { get; set; }
        public decimal kira { get; set; }
        public int Evsehirid { get; set; }
        public string Evsehiridb { get; set; }
        public string ilcenere { get; set; }
        public string mahnere { get; set; }
        public string resim { get; set; }
        public string satilikirami { get; set; }
        public int EvYTid { get; set; }
        public string EvYTidb { get; set; }
        public string goruntu { get; set; }
        public string kredi { get; set; }
        public string Evuid { get; set; }
        public string Evuidb { get; set; }

        public virtual CepheModel Cephebilgi { get; set; }
        public virtual IlModel Illerbilgi { get; set; }
        public virtual Isinma1 Isinmabilgi { get; set; }
        public virtual BKat Katbilgi { get; set; }
        public virtual KDurumuModel Kullanimbilgi { get; set; }
        public virtual TapuModel Tapubilgi { get; set; }
        public virtual YakitModel Yakitbilgi { get; set; }
        public virtual YTipiModel YTipibilgi { get; set; }
        public virtual YapiModel Yapibilgi { get; set; }
        public virtual UyeModel uyebilgi { get; set; }
    }
}