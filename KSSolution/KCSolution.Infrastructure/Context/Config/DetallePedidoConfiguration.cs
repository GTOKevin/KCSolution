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
    public class DetallePedidoConfiguration : IEntityTypeConfiguration<DetallePedido>
    {
        public void Configure(EntityTypeBuilder<DetallePedido> e)
        {
            e.ToTable("DetallesPedido");
            e.HasKey(x => x.Id);

            e.Property(x => x.Cantidad).IsRequired();

            e.Property(x => x.PrecioUnitario)
             .HasColumnType("decimal(18,2)")
             .IsRequired();

            e.HasOne(x => x.Producto)
             .WithMany()  
             .HasForeignKey(x => x.ProductoId)
             .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
