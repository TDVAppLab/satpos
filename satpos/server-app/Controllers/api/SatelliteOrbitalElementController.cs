using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.SatelliteOrbitalElement;
using TDIC.Controllers;
using TDIC.Models.EDM;
using TDIC.DTOs;
using System.Net.Http;
using System.Text.Json;
using System.Collections.Generic;





// For SPA
namespace API.Controllers
{
    public class SatelliteOrbitalElementController : BaseApiController
    { 
        [AllowAnonymous]
        [HttpGet("index")]
        public async Task<ActionResult> GetIndex()
        {
            return HandleResult(await Mediator.Send(new List.Query{}));
        }
        [AllowAnonymous]
        [HttpGet("getactivesatapi")]
        public async Task<ActionResult> GetActiveSatAPI()
        {


            return HandleResult(await Mediator.Send(new GetFromNORADActiveSatAPI.Command{}));
        }


    }
}