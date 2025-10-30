using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Dtos.Pedidos
{
    public class PedidoDto
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public int ClienteId { get; set; }
        public string ClienteNombre { get; set; } = string.Empty;
        public string ClienteApellido { get; set; } = string.Empty;
        public decimal PrecioTotal { get; set; }
        public List<DetallePedidoDto> Detalles { get; set; } = new();
    }

}
