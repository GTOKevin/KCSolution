using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Dtos.Pedidos
{
    public class CreatePedidoDto
    {
        public int ClienteId { get; set; }
        public List<CreateDetallePedidoDto> Detalles { get; set; } = new();
    }

    public class CreateDetallePedidoDto
    {
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal PrecioUnitario { get; set; }
    }
}
