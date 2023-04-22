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
using System.Net.Http;
using System.Text.Json;

namespace Application.SatelliteOrbitalElement
{
    public class List
    {
        public class Query : IRequest<Result<List<TDIC.Models.EDM.SatelliteOrbitalElement>>>{
        }

        public class Handler : IRequestHandler<Query, Result<List<TDIC.Models.EDM.SatelliteOrbitalElement>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<TDIC.Models.EDM.SatelliteOrbitalElement>>> Handle(Query request, CancellationToken cancellationToken)
            {                
                return Result<List<TDIC.Models.EDM.SatelliteOrbitalElement>>
                    .Success(await _context.SatelliteOrbitalElements.ToListAsync(cancellationToken));
            }
        }
    }
}