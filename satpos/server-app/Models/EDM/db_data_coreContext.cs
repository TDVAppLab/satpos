using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using TDIC.Domain;

#nullable disable

namespace TDIC.Models.EDM
{
    public partial class db_data_coreContext : IdentityDbContext<AppUser>
    {

        public db_data_coreContext(DbContextOptions<db_data_coreContext> options)
            : base(options)
        {
        }


        public virtual DbSet<SatelliteOrbitalElement> SatelliteOrbitalElements { get; set; }
        public virtual DbSet<tlestring> tlestrings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");



            modelBuilder.Entity<tlestring>(entity =>
            {
                entity.HasKey(e => e.noradcatid);
                entity.Property(e => e.noradcatid)
                        .ValueGeneratedNever();

                entity.ToTable("tlestrings");
            });



            modelBuilder.Entity<SatelliteOrbitalElement>(entity =>
            {
                entity.HasKey(e => e.NORAD_CAT_ID);
                entity.Property(e => e.NORAD_CAT_ID)
                        .ValueGeneratedNever();

                entity.ToTable("SatelliteOrbitalElements");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
