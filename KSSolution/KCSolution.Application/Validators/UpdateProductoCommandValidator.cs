using FluentValidation;
using KCSolution.Application.Dtos.Productos;
using KCSolution.Application.Features.Productos.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Validators
{
    public class UpdateProductoCommandValidator : AbstractValidator<UpdateProductoCommand>
    {
        public UpdateProductoCommandValidator()
        {
            RuleFor(x => x.Producto).NotNull();

            RuleFor(x => x.Producto.Id)
                .GreaterThan(0)
                .WithMessage("El ID del producto debe ser mayor que 0.");

            RuleFor(x => x.Producto.Descripcion)
                .NotEmpty().WithMessage("La descripción es obligatoria.")
                .MaximumLength(200).WithMessage("La descripción no puede superar los 200 caracteres.");
        }
    }
}
