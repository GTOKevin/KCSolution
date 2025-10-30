using FluentValidation;
using KCSolution.Application.Dtos.Pedidos;
using KCSolution.Application.Features.Pedidos.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Validators
{
    public class UpdatePedidoCommandValidator : AbstractValidator<UpdatePedidoCommand>
    {
        public UpdatePedidoCommandValidator()
        {
            RuleFor(x => x.Pedido)
                .NotNull().WithMessage("El pedido no puede ser nulo.");

            RuleFor(x => x.Pedido.Id)
                .GreaterThan(0)
                .WithMessage("El ID del pedido debe ser mayor que 0.");

            RuleFor(x => x.Pedido.ClienteId)
                .GreaterThan(0)
                .WithMessage("Debe indicar un cliente válido para el pedido.");

            RuleFor(x => x.Pedido.PrecioTotal)
                .GreaterThan(0)
                .WithMessage("El precio total debe ser mayor que 0.");

            // Opcional: si deseas asegurar que haya al menos un detalle
            RuleFor(x => x.Pedido.Detalles)
                .NotNull()
                .Must(d => d.Any())
                .WithMessage("El pedido debe tener al menos un detalle de producto.");
        }
    }
}
