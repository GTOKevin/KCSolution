using KCSolution.Domain.Models.Pedidos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Domain.Models.Clientes
{
    public class Cliente
    {
        public int Id { get; set; }               
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Dni { get; set; } = string.Empty; 
    }
}
