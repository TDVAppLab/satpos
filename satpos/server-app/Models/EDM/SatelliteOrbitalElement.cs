using System;
using System.Collections.Generic;

#nullable disable

namespace TDIC.Models.EDM
{

    public class SatelliteOrbitalElement
    {
        public string OBJECT_NAME { get; set; }
        public string OBJECT_ID { get; set; }
        public DateTime EPOCH { get; set; }
        public float MEAN_MOTION { get; set; }
        public float ECCENTRICITY { get; set; }
        public float INCLINATION { get; set; }
        public float RA_OF_ASC_NODE { get; set; }
        public float ARG_OF_PERICENTER { get; set; }
        public float MEAN_ANOMALY { get; set; }
        public int EPHEMERIS_TYPE { get; set; }
        public string CLASSIFICATION_TYPE { get; set; }
        public int NORAD_CAT_ID { get; set; }
        public int ELEMENT_SET_NO { get; set; }
        public int REV_AT_EPOCH { get; set; }
        public float BSTAR { get; set; }
        public float MEAN_MOTION_DOT { get; set; }
        public float MEAN_MOTION_DDOT { get; set; }
    }
}
