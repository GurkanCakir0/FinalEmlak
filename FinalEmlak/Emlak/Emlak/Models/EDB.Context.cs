﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Emlak.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class EDB1Entities7 : DbContext
    {
        public EDB1Entities7()
            : base("name=EDB1Entities7")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Cephe> Cephe { get; set; }
        public virtual DbSet<Ilanlar> Ilanlar { get; set; }
        public virtual DbSet<Iller> Iller { get; set; }
        public virtual DbSet<Isinma> Isinma { get; set; }
        public virtual DbSet<Kat> Kat { get; set; }
        public virtual DbSet<Kullanim> Kullanim { get; set; }
        public virtual DbSet<Tapu> Tapu { get; set; }
        public virtual DbSet<Uyeler> Uyeler { get; set; }
        public virtual DbSet<Yakit> Yakit { get; set; }
        public virtual DbSet<Yapi> Yapi { get; set; }
        public virtual DbSet<Yorumlar> Yorumlar { get; set; }
        public virtual DbSet<YTipi> YTipi { get; set; }
    }
}
