using KCSolution.Application.Dtos.Pedidos;
using KCSolution.Application.Features.Pedidos.Commands;
using KCSolution.Application.Features.Pedidos.Queries; 
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KCSolution.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PedidosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public PedidosController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<ActionResult<List<PedidoDto>>> GetAll() =>
            Ok(await _mediator.Send(new GetPedidosQuery()));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<PedidoDto>> GetById(int id) =>
            Ok(await _mediator.Send(new GetPedidoByIdQuery { Id = id }));

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreatePedidoDto dto)
        {
            var id = await _mediator.Send(new CreatePedidoCommand { Pedido = dto });
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdatePedidoDto dto)
        {
            dto.Id = id;
            await _mediator.Send(new UpdatePedidoCommand { Pedido = dto });
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeletePedidoCommand { Id = id });
            return NoContent();
        }
    }
}
