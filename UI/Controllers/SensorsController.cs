using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using UI.Controllers.Model;

namespace UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SensorsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Sensor>> GetCurrentSensors()
        {
            return new List<Sensor>()
            {
                new Sensor(1, 10, 300, new DateTime(), "michow"),
                new Sensor(2, 20, 100, new DateTime(), "lublin"),
            };
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Sensor>> GetLastDay(long sensorId)
        {
            return new List<Sensor>()
            {
                new Sensor(1, 10, 300, new DateTime().AddHours(-1), "michow"),
                new Sensor(2, 20, 100, new DateTime(), "michow"),
            };
        }
    }
}