using KCSolution.Application.Dtos.Clientes;
using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Clientes.Queries
{
    public class GetClientesQuery : IRequest<List<ClienteDto>> { }

    public class GetClientesHandler : IRequestHandler<GetClientesQuery, List<ClienteDto>>
    {
        private readonly ContextDB _db;
        public GetClientesHandler(ContextDB db) => _db = db;

        public async Task<List<ClienteDto>> Handle(GetClientesQuery request, CancellationToken ct)
        {
            return await _db.Clientes
                .Select(c => new ClienteDto
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                    Apellido = c.Apellido,
                    Dni = c.Dni
                })
                .ToListAsync(ct);
        }
    }
}
