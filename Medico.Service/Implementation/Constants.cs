using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public static class Constants
    {
            //This is for Forget password mail with which unique key is generate and is valid for the time thats added in below property
            public static readonly int MaxUniqueKeyExipirationTime = 15;
            public static readonly int NoOfLoginAtempts = 3;

        
    }
}
