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
    public class GetPedidosQuery : IRequest<List<PedidoDto>> { }

    public class GetPedidosHandler : IRequestHandler<GetPedidosQuery, List<PedidoDto>>
    {
        private readonly ContextDB _db;
        public GetPedidosHandler(ContextDB db) => _db = db;

        public async Task<List<PedidoDto>> Handle(GetPedidosQuery request, CancellationToken ct)
        {
            return await _db.Pedidos
                .Include(p => p.Cliente)
                .Select(p => new PedidoDto
                {
                    Id = p.Id,
                    Fecha = p.Fecha,
                    ClienteId = p.ClienteId,
                    ClienteNombre = p.Cliente.Nombre,
                    ClienteApellido = p.Cliente.Apellido,
                    PrecioTotal = p.PrecioTotal,
                    Detalles = new List<DetallePedidoDto>() // para listas no cargamos detalles
                })
                .ToListAsync(ct);
        }
    }
}
