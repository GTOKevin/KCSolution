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
    public class CreatePedidoCommandValidator : AbstractValidator<CreatePedidoCommand>
    {
        public CreatePedidoCommandValidator()
        {
            RuleFor(x => x.Pedido).NotNull().WithMessage("El pedido no puede ser nulo.");

            RuleFor(x => x.Pedido.ClienteId)
                .GreaterThan(0).WithMessage("Debe indicar un cliente válido.");

            RuleFor(x => x.Pedido.Detalles)
                .NotNull().WithMessage("Debe enviar la lista de detalles.")
                .Must(d => d.Any()).WithMessage("El pedido debe tener al menos un detalle.");

            RuleForEach(x => x.Pedido.Detalles).ChildRules(d =>
            {
                d.RuleFor(y => y.ProductoId)
                    .GreaterThan(0).WithMessage("Producto inválido.");

                d.RuleFor(y => y.Cantidad)
                    .GreaterThan(0).WithMessage("La cantidad debe ser mayor a 0.");
            });
        }
    }
}
