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
    public class GetClienteByIdQuery : IRequest<ClienteDto>
    {
        public int Id { get; set; }
    }

    public class GetClienteByIdHandler : IRequestHandler<GetClienteByIdQuery, ClienteDto>
    {
        private readonly ContextDB _db;
        public GetClienteByIdHandler(ContextDB db) => _db = db;

        public async Task<ClienteDto> Handle(GetClienteByIdQuery request, CancellationToken ct)
        {
            var entity = await _db.Clientes.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
            if (entity == null) throw new Exception("Cliente no encontrado");

            return new ClienteDto
            {
                Id = entity.Id,
                Nombre = entity.Nombre,
                Apellido = entity.Apellido,
                Dni = entity.Dni
            };
        }
    }
}
