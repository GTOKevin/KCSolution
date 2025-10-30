using KCSolution.Infrastructure.Context;
using MediatR;
using Microsoft.EntityFrameworkCore; 
namespace KCSolution.Application.Features.Clientes.Commands
{
    public class DeleteClienteCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteClienteHandler : IRequestHandler<DeleteClienteCommand>
    {
        private readonly ContextDB _db;

        public DeleteClienteHandler(ContextDB db)
        {
            _db = db;
        }

        public async Task Handle(DeleteClienteCommand request, CancellationToken ct)
        {
            var entity = await _db.Clientes.FirstOrDefaultAsync(x => x.Id == request.Id, ct);
            if (entity is null)
                throw new Exception("Cliente no encontrado");

            _db.Clientes.Remove(entity);
            await _db.SaveChangesAsync(ct);
        }
    }
}
