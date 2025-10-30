using KCSolution.Domain.Models.Clientes;
using KCSolution.Domain.Models.Pedidos;
using KCSolution.Domain.Models.Productos;
using KCSolution.Infrastructure.Context.Config;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Infrastructure.Context
{
    public class ContextDB : DbContext
    { 
        public ContextDB(DbContextOptions<ContextDB> options)
            : base(options)
        {
        }
        public DbSet<Cliente> Clientes => Set<Cliente>();
        public DbSet<Producto> Productos => Set<Producto>();
        public DbSet<Pedido> Pedidos => Set<Pedido>();
        public DbSet<DetallePedido> DetallesPedido => Set<DetallePedido>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new ClienteConfiguration());
            modelBuilder.ApplyConfiguration(new PedidoConfiguration());
            modelBuilder.ApplyConfiguration(new DetallePedidoConfiguration());
            modelBuilder.ApplyConfiguration(new ProductoConfiguration());
        }
    }
}
