using FluentValidation;
using KCSolution.Application.Dtos.Clientes;
using KCSolution.Application.Features.Clientes.Commands;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Validators
{
    namespace KCSolution.Application.Validators
    {
        public class CreateClienteCommandValidator : AbstractValidator<CreateClienteCommand>
        {
            public CreateClienteCommandValidator()
            {
                RuleFor(x => x.Cliente).NotNull();

                RuleFor(x => x.Cliente.Nombre)
                    .NotEmpty().WithMessage("El nombre es obligatorio.")
                    .MaximumLength(100);

                RuleFor(x => x.Cliente.Apellido)
                    .NotEmpty().WithMessage("El apellido es obligatorio.")
                    .MaximumLength(100);

                RuleFor(x => x.Cliente.Dni)
                    .NotEmpty().WithMessage("El DNI es obligatorio.")
                    .Length(8, 15)
                    .WithMessage("El DNI debe tener entre 8 y 15 caracteres.");
            }
        }
    }
}
