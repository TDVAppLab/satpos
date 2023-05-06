using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.BatchLog;
using TDIC.Controllers;





// For SPA
namespace API.Controllers
{
    public class BatchController : BaseApiController
    { 
        [AllowAnonymous]
        [HttpGet("index")]
        public async Task<ActionResult> GetIndex()
        {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }
        [AllowAnonymous]
        [HttpPost("getactivesatapi")]
        public async Task<ActionResult> GetActiveSatAPI()
        {
            return HandleResult(await Mediator.Send(new GetFromNORADActiveSatAPITLE.Command{}));
        }

    }
}