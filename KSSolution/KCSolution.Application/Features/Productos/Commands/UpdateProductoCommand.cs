using KCSolution.Application.Dtos.Productos;
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
    public class UpdateProductoCommand : IRequest
    {
        public UpdateProductoDto Producto { get; set; } = null!;
    }

    public class UpdateProductoHandler : IRequestHandler<UpdateProductoCommand>
    {
        private readonly ContextDB _db;
        public UpdateProductoHandler(ContextDB db) => _db = db;

        public async Task Handle(UpdateProductoCommand request, CancellationToken ct)
        {
            var p = request.Producto;
            var entity = await _db.Productos.FirstOrDefaultAsync(x => x.Id == p.Id, ct);
            if (entity is null)
                throw new Exception("Producto no encontrado");

            entity.Descripcion = p.Descripcion;

            await _db.SaveChangesAsync(ct);
        }
    }
}
