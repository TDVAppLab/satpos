using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{

    public class batchlog
    {
        public long id { get; set; }
        public long opcode { get; set; }
        public DateTime? batchdate { get; set; }
    }
}
