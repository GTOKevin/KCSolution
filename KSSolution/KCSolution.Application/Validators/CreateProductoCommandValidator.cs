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
    public class CreateProductoCommandValidator : AbstractValidator<CreateProductoCommand>
    {
        public CreateProductoCommandValidator()
        {
            RuleFor(x => x.Producto)
                .NotNull().WithMessage("El producto no puede ser nulo.");

            RuleFor(x => x.Producto.Descripcion)
                .NotEmpty().WithMessage("La descripción es obligatoria.")
                .MaximumLength(200).WithMessage("La descripción no puede superar los 200 caracteres.");
        }
    }
}
