using System;

namespace UI.Controllers.Model
{
    public class LocationMeassurements
    {
        public LocationMeassurements(long id, double pm10Value, double pm25Value, DateTime periodTo, string name)
        {
            Id = id;
            Pm10Value = pm10Value;
            Pm25Value = pm25Value;
            PeriodTo = periodTo;
            Name = name;
        }

        public long Id { get; }

        public double Pm10Value { get; }

        public double Pm25Value { get; }

        public DateTime PeriodTo { get; }

        public string Name { get; }
    }
}
