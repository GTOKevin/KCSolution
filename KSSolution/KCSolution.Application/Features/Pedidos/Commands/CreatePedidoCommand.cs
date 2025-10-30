using KCSolution.Application.Dtos.Pedidos;
using KCSolution.Domain.Models.Pedidos;
using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Pedidos.Commands
{
    public class CreatePedidoCommand : IRequest<int>
    {
        public CreatePedidoDto Pedido { get; set; } = null!;
    }

    public class CreatePedidoHandler : IRequestHandler<CreatePedidoCommand, int>
    {
        private readonly ContextDB _db;
        public CreatePedidoHandler(ContextDB db) => _db = db;

        public async Task<int> Handle(CreatePedidoCommand request, CancellationToken ct)
        {
            var dto = request.Pedido;

            if (dto.Detalles is null || dto.Detalles.Count == 0)
                throw new Exception("Debe registrar al menos un detalle.");

            // Validar cliente
            var clienteExiste = await _db.Clientes.AnyAsync(c => c.Id == dto.ClienteId, ct);
            if (!clienteExiste) throw new Exception("Cliente no existe.");

            // Traer productos requeridos
            var ids = dto.Detalles.Select(d => d.ProductoId).Distinct().ToList();
            var productos = await _db.Productos
                .Where(p => ids.Contains(p.Id))
                .ToDictionaryAsync(p => p.Id, ct);

            // Ensamblar pedido
            var pedido = new Pedido
            {
                ClienteId = dto.ClienteId,
                Fecha = DateTime.UtcNow
            };

            foreach (var d in dto.Detalles)
            {
                if (!productos.TryGetValue(d.ProductoId, out var prod))
                    throw new Exception($"Producto {d.ProductoId} no existe.");
                if (d.Cantidad <= 0)
                    throw new Exception("La cantidad debe ser mayor a 0.");

                pedido.Detalles.Add(new DetallePedido
                {
                    ProductoId = prod.Id,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario
                });
            }

            // Calcular total en servidor
            pedido.PrecioTotal = pedido.Detalles.Sum(x => x.Cantidad * x.PrecioUnitario);

            // Transacción única
            using var tx = await _db.Database.BeginTransactionAsync(ct);
            _db.Pedidos.Add(pedido);
            await _db.SaveChangesAsync(ct);
            await tx.CommitAsync(ct);

            return pedido.Id;
        }
    }
}
