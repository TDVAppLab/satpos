﻿using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{

    public class tlestring
    {
        public int noradcatid { get; set; }
        public string objectname { get; set; }
        public string line1 { get; set; }
        public string line2 { get; set; }
        public DateTime? latest_update_datetime { get; set; }
    }
}
