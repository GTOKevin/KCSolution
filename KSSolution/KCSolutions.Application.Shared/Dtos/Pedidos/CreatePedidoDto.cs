using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolutions.Application.Shared.Dtos.Pedidos
{
    public record CreatePedidoDto(int ClienteId, List<CreateDetallePedidoDto> Detalles);
    public record CreateDetallePedidoDto(int ProductoId, int Cantidad);
}
