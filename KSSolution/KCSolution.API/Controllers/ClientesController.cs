using KCSolution.Application.Dtos.Clientes;
using KCSolution.Application.Features.Clientes.Commands;
using KCSolution.Application.Features.Clientes.Queries;
using KCSolution.Domain.Models.Clientes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KCSolution.API.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ClientesController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<ActionResult<List<ClienteDto>>> GetAll() =>
            Ok(await _mediator.Send(new GetClientesQuery()));

        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteDto>> GetById(int id) =>
            Ok(await _mediator.Send(new GetClienteByIdQuery { Id = id }));

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateClienteDto dto)
        {
            var id = await _mediator.Send(new CreateClienteCommand { Cliente = dto });
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdateClienteDto dto)
        {
            dto.Id = id;
            await _mediator.Send(new UpdateClienteCommand { Cliente = dto });
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteClienteCommand { Id = id });
            return NoContent();
        }
    }

}
