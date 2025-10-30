using KCSolution.Application.Dtos.Clientes;
using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Clientes.Commands
{
    public class UpdateClienteCommand : IRequest
    {
        public UpdateClienteDto Cliente { get; set; } = null!;
    }

    public class UpdateClienteHandler : IRequestHandler<UpdateClienteCommand>
    {
        private readonly ContextDB _db;
        public UpdateClienteHandler(ContextDB db) => _db = db;

        // Fíjate: devuelve Task, NO Task<Unit>
        public async Task Handle(UpdateClienteCommand request, CancellationToken ct)
        {
            var c = request.Cliente;

            var entity = await _db.Clientes.FirstOrDefaultAsync(x => x.Id == c.Id, ct);
            if (entity is null)
                throw new Exception("Cliente no encontrado");

            entity.Nombre = c.Nombre;
            entity.Apellido = c.Apellido;
            entity.Dni = c.Dni;

            await _db.SaveChangesAsync(ct);
        }
    }
}
