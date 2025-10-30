using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Productos.Commands
{
    public class DeleteProductoCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteProductoHandler : IRequestHandler<DeleteProductoCommand>
    {
        private readonly ContextDB _db;
        public DeleteProductoHandler(ContextDB db) => _db = db;

        public async Task Handle(DeleteProductoCommand request, CancellationToken ct)
        {
            var entity = await _db.Productos.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
            if (entity is null)
                throw new Exception("Producto no encontrado");

            _db.Productos.Remove(entity);
            await _db.SaveChangesAsync(ct);
        }
    }
}
