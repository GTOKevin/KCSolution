using KCSolution.Application.Dtos.Productos;
using KCSolution.Domain.Models.Productos;
using KCSolution.Infrastructure.Context;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Productos.Commands
{
    public class CreateProductoCommand : IRequest<int>
    {
        public CreateProductoDto Producto { get; set; } = null!;
    }

    public class CreateProductoHandler : IRequestHandler<CreateProductoCommand, int>
    {
        private readonly ContextDB _db;
        public CreateProductoHandler(ContextDB db) => _db = db;

        public async Task<int> Handle(CreateProductoCommand request, CancellationToken ct)
        {
            var p = request.Producto;

            var entity = new Producto
            {
                Descripcion = p.Descripcion
            };

            _db.Productos.Add(entity);
            await _db.SaveChangesAsync(ct);
            return entity.Id;
        }
    }
}
