using KCSolution.Application.Dtos.Pedidos;
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
    public class UpdatePedidoCommand : IRequest
    {
        public UpdatePedidoDto Pedido { get; set; } = null!;
    }

    public class UpdatePedidoHandler : IRequestHandler<UpdatePedidoCommand>
    {
        private readonly ContextDB _db;
        public UpdatePedidoHandler(ContextDB db) => _db = db;

        public async Task Handle(UpdatePedidoCommand request, CancellationToken ct)
        {
            var dto = request.Pedido;

            var entity = await _db.Pedidos.FirstOrDefaultAsync(x => x.Id == dto.Id, ct);
            if (entity is null) throw new Exception("Pedido no encontrado.");

            var clienteExiste = await _db.Clientes.AnyAsync(c => c.Id == dto.ClienteId, ct);
            if (!clienteExiste) throw new Exception("Cliente no existe.");

            entity.ClienteId = dto.ClienteId;
            if (dto.Fecha.HasValue) entity.Fecha = dto.Fecha.Value;

            await _db.SaveChangesAsync(ct);
        }
    }
}
