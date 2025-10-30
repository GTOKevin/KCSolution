using KCSolution.Application.Dtos.Pedidos;
using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Pedidos.Queries
{
    public class GetPedidoByIdQuery : IRequest<PedidoDto>
    {
        public int Id { get; set; }
    }

    public class GetPedidoByIdHandler : IRequestHandler<GetPedidoByIdQuery, PedidoDto>
    {
        private readonly ContextDB _db;
        public GetPedidoByIdHandler(ContextDB db) => _db = db;

        public async Task<PedidoDto> Handle(GetPedidoByIdQuery request, CancellationToken ct)
        {
            var p = await _db.Pedidos
                .Include(x => x.Cliente)
                .Include(x => x.Detalles)
                    .ThenInclude(d => d.Producto)
                .FirstOrDefaultAsync(x => x.Id == request.Id, ct);

            if (p is null) throw new Exception("Pedido no encontrado.");

            return new PedidoDto
            {
                Id = p.Id,
                Fecha = p.Fecha,
                ClienteId = p.ClienteId,
                ClienteNombre = p.Cliente.Nombre,
                ClienteApellido = p.Cliente.Apellido,
                PrecioTotal = p.PrecioTotal,
                Detalles = p.Detalles.Select(d => new DetallePedidoDto
                {
                    ProductoId = d.ProductoId,
                    Producto = d.Producto.Descripcion,
                    Cantidad = d.Cantidad,
                    PrecioUnitario = d.PrecioUnitario,
                    Subtotal = d.Cantidad * d.PrecioUnitario
                }).ToList()
            };
        }
    }
}
