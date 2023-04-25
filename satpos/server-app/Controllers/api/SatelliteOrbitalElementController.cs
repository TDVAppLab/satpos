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
using Application.tlestring;





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


            return HandleResult(await Mediator.Send(new GetFromNORADActiveSatAPITLE.Command{}));
        }

        [AllowAnonymous]
        [HttpGet("details/{id}")]
        public async Task<ActionResult> GetActivity(int id)
        {
            return HandleResult(await Mediator.Send(new Details.Query{ID = id}));
        }

        [AllowAnonymous]
        [HttpGet("gettlestring/{id}")]
        public async Task<ActionResult> GetTleString(int id)
        {
            return HandleResult(await Mediator.Send(new GetTleString.Query{ID = id}));
        }

    }
}