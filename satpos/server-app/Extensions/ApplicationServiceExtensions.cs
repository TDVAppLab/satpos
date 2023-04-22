

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.SatelliteOrbitalElement;
using AutoMapper;
using TDIC.Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace TDIC.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection ApplicationServices(this IServiceCollection services,
                                IConfiguration config)
        {
             services.AddMediatR(typeof(List.Handler).Assembly);
             services.AddAutoMapper(typeof(MappingProfiles));

             return services;
        }
    }
}

