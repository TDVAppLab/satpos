using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.SatelliteOrbitalElement
{
    public class Details
    {
        public class Query : IRequest<Result<TDIC.Models.EDM.SatelliteOrbitalElement>>{
            public int ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<TDIC.Models.EDM.SatelliteOrbitalElement>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
            

            public async Task<Result<TDIC.Models.EDM.SatelliteOrbitalElement>> Handle(Query request, CancellationToken cancellationToken)
            {
                var SatelliteOrbitalElement =  await _context.SatelliteOrbitalElements.FindAsync(request.ID);

                if(SatelliteOrbitalElement==null) throw new Exception("t_article not found");

                return Result<TDIC.Models.EDM.SatelliteOrbitalElement>.Success(SatelliteOrbitalElement);
            }
        }
    }
}