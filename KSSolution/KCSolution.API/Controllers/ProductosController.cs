using KCSolution.Application.Dtos.Productos;
using KCSolution.Application.Features.Productos.Commands;
using KCSolution.Application.Features.Productos.Queries; 
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace KCSolution.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public ProductosController(IMediator mediator) => _mediator = mediator;

        [HttpGet]
        public async Task<ActionResult<List<ProductoDto>>> GetAll() =>
            Ok(await _mediator.Send(new GetProductosQuery()));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<ProductoDto>> GetById(int id) =>
            Ok(await _mediator.Send(new GetProductoByIdQuery { Id = id }));

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateProductoDto dto)
        {
            var id = await _mediator.Send(new CreateProductoCommand { Producto = dto });
            return CreatedAtAction(nameof(GetById), new { id }, id);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateProductoDto dto)
        {
            dto.Id = id;
            await _mediator.Send(new UpdateProductoCommand { Producto = dto });
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _mediator.Send(new DeleteProductoCommand { Id = id });
            return NoContent();
        }
    }

}
