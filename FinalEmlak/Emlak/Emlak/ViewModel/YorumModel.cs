using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Emlak.ViewModel
{
    public class YorumModel
    {
        public int YorumId { get; set; }
        public string YorumIcerik { get; set; }
        public string uid { get; set; }
        public string Ilanid { get; set; }
        public string KullaniciAdi { get; set; }
        public string IlanBaslik { get; set; }
        public DateTime Tarih { get; set; }

        public virtual IlanModel IlanlarBilgisi { get; set; }
        public virtual UyeModel UyelerBilgisi { get; set; }
    }
}