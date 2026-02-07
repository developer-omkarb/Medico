using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class PhyInfo
    {
        public int phyId { get; set; }
        public string Name { get; set; }
        public string spacialities { get; set; }
        public string Exp { get; set; }
        public string Score { get; set; }
        public int TotalReview { get; set; }
        public string Location { get; set; }
        public string imgurl { get; set; }
    }
}
