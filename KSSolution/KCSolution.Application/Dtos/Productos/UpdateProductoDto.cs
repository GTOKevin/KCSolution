using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KCSolution.Application.Dtos.Productos
{
    public class UpdateProductoDto
    {
        public int Id { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }
}
