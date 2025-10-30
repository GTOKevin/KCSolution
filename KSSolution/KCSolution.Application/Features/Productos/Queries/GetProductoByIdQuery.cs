using KCSolution.Application.Dtos.Productos;
using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Productos.Queries
{
    public class GetProductoByIdQuery : IRequest<ProductoDto>
    {
        public int Id { get; set; }
    }

    public class GetProductoByIdHandler : IRequestHandler<GetProductoByIdQuery, ProductoDto>
    {
        private readonly ContextDB _db;
        public GetProductoByIdHandler(ContextDB db) => _db = db;

        public async Task<ProductoDto> Handle(GetProductoByIdQuery request, CancellationToken ct)
        {
            var entity = await _db.Productos.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
            if (entity is null)
                throw new Exception("Producto no encontrado");

            return new ProductoDto
            {
                Id = entity.Id,
                Descripcion = entity.Descripcion
            };
        }
    }
}
