using KCSolution.Domain.Models.Clientes;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Infrastructure.Context.Config
{
    public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> e)
        {
            e.ToTable("Clientes");
            e.HasKey(x => x.Id);
            e.Property(x => x.Nombre).HasMaxLength(120).IsRequired();
            e.Property(x => x.Apellido).HasMaxLength(120).IsRequired();
            e.Property(x => x.Dni).HasMaxLength(15).IsRequired();

            e.HasIndex(x => x.Dni).IsUnique();  
        }
    }
}
