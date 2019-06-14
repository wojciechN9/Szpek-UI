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
                new Model.LocationMeassurements(1, 10, 300, DateTime.Now, "michow"),
                new Model.LocationMeassurements(2, 20, 100, DateTime.Now, "lublin"),
                new Model.LocationMeassurements(3, 30, 400, DateTime.Now, "śląskie siemianowice, aaaa")
            };
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Model.LocationMeassurements>> GetLastDay(long sensorId)
        {
            return new List<Model.LocationMeassurements>()
            {
                new Model.LocationMeassurements(sensorId, 10, 300, DateTime.Now.AddHours(-1), "michow"),
                new Model.LocationMeassurements(sensorId, 20, 100, DateTime.Now, "michow")
            };
        }
    }
}