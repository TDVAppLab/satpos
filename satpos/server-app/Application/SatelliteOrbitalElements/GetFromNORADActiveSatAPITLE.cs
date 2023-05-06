using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using TDIC.Application.Core;
using TDIC.Models.EDM;
using MediatR;
using System.Net.Http;
using System.Text.Json;
using System;

namespace Application.SatelliteOrbitalElement
{

    
    public class GetFromNORADActiveSatAPITLE
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

                
                var satJsonStrings = await getStringfromURL("http://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=json");//
                var satJsonList = JsonSerializer.Deserialize<List<TDIC.Models.EDM.SatelliteOrbitalElement>>(satJsonStrings);



                var activasatstrings = await getStringfromURL("https://celestrak.org/NORAD/elements/gp.php?GROUP=active&FORMAT=2le");//
                
                string[] lines = activasatstrings.Split(new []{ "\r\n" }, StringSplitOptions.None);
                
                List<TDIC.Models.EDM.tlestring> tles = new List<TDIC.Models.EDM.tlestring>();
                
                for (int i=0; i < lines.Length-1; i=i+2) {
                    tles.Add(new TDIC.Models.EDM.tlestring{
                        noradcatid= int.Parse(lines[i+1].Substring(2,5)), 
                        line1=lines[i],
                        line2=lines[i+1],
                        objectname = (satJsonList.Find(x => x.NORAD_CAT_ID == int.Parse(lines[i+1].Substring(2,5))) ?? new TDIC.Models.EDM.SatelliteOrbitalElement{OBJECT_NAME = ""}) .OBJECT_NAME
                    });
                    
                }
                foreach (var tle in tles)
                {
                    await _context.tlestrings.AddAsync(tle);
                }

                //--------------------------
                //logテーブルに記録
                var batchlog = new batchlog{
                    opcode = 1,
                    batchdate = DateTime.Now
                };
                    await _context.batchlogs.AddAsync(batchlog);
                //--------------------------

                var result = await _context.SaveChangesAsync() > 0;

                if(!result) return Result<Unit>.Failure("fail to delete t_instruction");

                return Result<Unit>.Success(Unit.Value);
            }

            async Task<string> getStringfromURL(string url){
                using var client = new HttpClient();
                var response = await client.GetStringAsync(url);
                return response;
            }
        }
    }
}