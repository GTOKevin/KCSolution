using KCSolution.Domain.Models.Pedidos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Dtos.Pedidos
{
    public class UpdatePedidoDto
    {
        public int Id { get; set; }
        public int ClienteId { get; set; }
        public DateTime? Fecha { get; set; }
        public decimal PrecioTotal { get; set; }
        public List<DetallePedidoDto> Detalles { get; set; }
    }
}
