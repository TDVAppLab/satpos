using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using System.Net.Http;
using System.Text.Json;

namespace Application.SatelliteOrbitalElement
{
    
    public class GetFromNORADActiveSatAPI
    {
        public class Command : IRequest<Result<Unit>>
        {
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly db_data_coreContext _context;
            public Handler(db_data_coreContext context)
            {
                _context = context;

            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                
                var url = "http://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json";//

                using var client = new HttpClient();
                var response = await client.GetStringAsync(url);
                
                // JSON文字列をオブジェクトにデシリアライズする
                var satdatalist = JsonSerializer.Deserialize<List<TDIC.Models.EDM.SatelliteOrbitalElement>>(response);
                
                foreach (var satdata in satdatalist)
                {
                    await _context.SatelliteOrbitalElements.AddAsync(satdata);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instruction");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}