using KCSolution.Domain.Models.Pedidos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Domain.Models.Productos
{
    public class Producto
    {
        public int Id { get; set; }         
        public string Descripcion { get; set; } = string.Empty;
          
    }
}
