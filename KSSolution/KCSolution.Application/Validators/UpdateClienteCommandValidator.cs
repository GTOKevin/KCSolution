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
     
    public class UpdateClienteCommandValidator : AbstractValidator<UpdateClienteCommand>
    {
        public UpdateClienteCommandValidator()
        {
            RuleFor(x => x.Cliente.Id)
                .GreaterThan(0).WithMessage("El ID debe ser mayor que 0.");

            RuleFor(x => x.Cliente.Nombre)
                .NotEmpty().WithMessage("El nombre es obligatorio.");

            RuleFor(x => x.Cliente.Apellido)
                .NotEmpty().WithMessage("El apellido es obligatorio.");

            RuleFor(x => x.Cliente.Dni)
                .NotEmpty().Length(8, 15)
                .WithMessage("El DNI debe tener entre 8 y 15 caracteres.");
        }
    }
}
