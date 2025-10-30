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
    public class DeletePedidoCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeletePedidoHandler : IRequestHandler<DeletePedidoCommand>
    {
        private readonly ContextDB _db;
        public DeletePedidoHandler(ContextDB db) => _db = db;

        public async Task Handle(DeletePedidoCommand request, CancellationToken ct)
        {
            var entity = await _db.Pedidos
                .Include(p => p.Detalles)
                .FirstOrDefaultAsync(p => p.Id == request.Id, ct);

            if (entity is null) throw new Exception("Pedido no encontrado.");

            // EF borra los detalles por FK si está configurado; si no, RemoveRange:
            if (entity.Detalles?.Count > 0)
                _db.RemoveRange(entity.Detalles);

            _db.Pedidos.Remove(entity);
            await _db.SaveChangesAsync(ct);
        }
    }
}
