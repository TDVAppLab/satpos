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

namespace Application.BatchLog
{
    public class List
    {
        public class Query : IRequest<Result<List<batchlog>>>{
        }

        public class Handler : IRequestHandler<Query, Result<List<batchlog>>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;
            }

            public async Task<Result<List<batchlog>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<batchlog>>
                    .Success(await _context.batchlogs.ToListAsync(cancellationToken));
            }
        }
    }
}