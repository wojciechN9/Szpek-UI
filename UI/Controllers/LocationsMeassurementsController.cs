using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationMeassurements : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Model.LocationMeassurements>> GetCurrentLocationsMeassurements()
        {
            return new List<Model.LocationMeassurements>()
            {
                new Model.LocationMeassurements(1,
                    new Model.AddressRead(1, "michow", "szkolna", "21-140", "lubelskie", "PL", 51.5221957M, 22.3051764M),
                    new List<Model.MeassurementRead>(){
                        new Model.MeassurementRead(1, 130, 180, DateTime.Now) }),
                new Model.LocationMeassurements(2,
                 new Model.AddressRead(1, "lublin", "ogrod botaniczny", "20-819", "lubelskie", "PL", 51.265757M, 22.5166413M),
                    new List<Model.MeassurementRead>(){
                         new Model.MeassurementRead(1, 13, 18, DateTime.Now) }),
                new Model.LocationMeassurements(3,
                    new Model.AddressRead(1, "śląskie siemianowice", "weglowa", "55-140", "śląskie", "PL", 50.3139976M, 19.0385963M),
                    new List<Model.MeassurementRead>(){
                        new Model.MeassurementRead(4, 111, 222, DateTime.Now) })
            };
        }

        [HttpGet("{id}")]
        public ActionResult<Model.LocationMeassurements> GetLastDay(long sensorId)
        {
            return new Model.LocationMeassurements(3,
                    new Model.AddressRead(1, "śląskie siemianowice", "weglowa", "55-140", "śląskie", "PL", 50.3139976M, 19.0385963M),
                    new List<Model.MeassurementRead>()
                    {
                        new Model.MeassurementRead(4, 111, 222, DateTime.Now.AddHours(-2)),
                        new Model.MeassurementRead(10, 1, 3, DateTime.Now.AddHours(-1)),
                        new Model.MeassurementRead(15, 2, 33, DateTime.Now)
                    });
        }
    }
}