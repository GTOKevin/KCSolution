using KCSolution.Domain.Models.Pedidos;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Infrastructure.Context.Config
{
    public class PedidoConfiguration : IEntityTypeConfiguration<Pedido>
    {
        public void Configure(EntityTypeBuilder<Pedido> e)
        {
            e.ToTable("Pedidos");
            e.HasKey(x => x.Id);

            e.Property(x => x.Fecha)
             .HasColumnType("datetime2")
             .HasDefaultValueSql("GETUTCDATE()");

            e.Property(x => x.PrecioTotal)
             .HasColumnType("decimal(18,2)")
             .IsRequired();

            e.HasOne(x => x.Cliente)
             .WithMany()         
             .HasForeignKey(x => x.ClienteId)
             .OnDelete(DeleteBehavior.Restrict);

            e.HasMany(x => x.Detalles)
             .WithOne(d => d.Pedido)
             .HasForeignKey(d => d.PedidoId);
        }
    }
}
