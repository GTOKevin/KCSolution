using KCSolution.Application.Dtos.Clientes;
using KCSolution.Domain.Models.Clientes;
using KCSolution.Infrastructure.Context;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Features.Clientes.Commands
{
    public class CreateClienteCommand : IRequest<int>
    {
        public CreateClienteDto Cliente { get; set; } = null!;
    }

    public class CreateClienteHandler : IRequestHandler<CreateClienteCommand, int>
    {
        private readonly ContextDB _db;
        public CreateClienteHandler(ContextDB db) => _db = db;

        public async Task<int> Handle(CreateClienteCommand request, CancellationToken ct)
        {
            var c = request.Cliente;

            var entity = new Cliente
            {
                Nombre = c.Nombre,
                Apellido = c.Apellido,
                Dni = c.Dni
            };

            _db.Clientes.Add(entity);
            await _db.SaveChangesAsync(ct);
            return entity.Id;
        }
    }
}
