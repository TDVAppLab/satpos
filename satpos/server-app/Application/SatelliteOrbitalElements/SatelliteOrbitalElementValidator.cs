using System.Collections.Generic;
using TDIC.Models.EDM;
using FluentValidation;
using TDIC.DTOs;

namespace Application.SatelliteOrbitalElement
{
    public class SatelliteOrbitalElementValidator : AbstractValidator<TDIC.Models.EDM.SatelliteOrbitalElement>
    {
        public SatelliteOrbitalElementValidator()
        {
        }
    }
}


