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

namespace Application.tlestring
{
    public class GetTleString
    {
        public class Query : IRequest<Result<TDIC.Models.EDM.tlestring>>{
            public int ID {get; set;}
        }

        public class Handler : IRequestHandler<Query, Result<TDIC.Models.EDM.tlestring>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }
            

            public async Task<Result<TDIC.Models.EDM.tlestring>> Handle(Query request, CancellationToken cancellationToken)
            {
                var tlestring =  await _context.tlestrings.FindAsync(request.ID);

                if(tlestring==null) throw new Exception("t_article not found");

                return Result<TDIC.Models.EDM.tlestring>.Success(tlestring);
            }
        }
    }
}