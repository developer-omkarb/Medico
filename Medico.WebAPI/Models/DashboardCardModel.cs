using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class DashboardCardModel
    {
        public string Header { get; set; }
        public string Description { get; set; }
        public string ImgUrl { get; set; }
        public string Value { get; set; }
    }
}
