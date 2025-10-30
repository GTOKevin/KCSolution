using KCSolution.Domain.Models.Productos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Infrastructure.Context.Config
{
    public class ProductoConfiguration : IEntityTypeConfiguration<Producto>
    {
        public void Configure(EntityTypeBuilder<Producto> e)
        {
            e.ToTable("Productos");
            e.HasKey(x => x.Id);
            e.Property(x => x.Descripcion).HasMaxLength(200).IsRequired();
        }
    }
}
