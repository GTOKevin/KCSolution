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
    public class GetProductosQuery : IRequest<List<ProductoDto>> { }

    public class GetProductosHandler : IRequestHandler<GetProductosQuery, List<ProductoDto>>
    {
        private readonly ContextDB _db;
        public GetProductosHandler(ContextDB db) => _db = db;

        public async Task<List<ProductoDto>> Handle(GetProductosQuery request, CancellationToken ct)
        {
            return await _db.Productos
                .Select(p => new ProductoDto
                {
                    Id = p.Id,
                    Descripcion = p.Descripcion
                })
                .ToListAsync(ct);
        }
    }
}
