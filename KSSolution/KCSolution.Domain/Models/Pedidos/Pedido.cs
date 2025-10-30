using KCSolution.Domain.Models.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Domain.Models.Pedidos
{
    public class Pedido
    {
        public int Id { get; set; }                     
        public DateTime Fecha { get; set; }             
        public int ClienteId { get; set; }              
        public decimal PrecioTotal { get; set; }      
        public Cliente Cliente { get; set; } = null!;
        public List<DetallePedido> Detalles { get; set; } = new();
    }
}
