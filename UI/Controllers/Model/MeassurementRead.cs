using System;

namespace UI.Controllers.Model
{
    public class MeassurementRead
    {
        public MeassurementRead(long id, double pm10Value, double pm25Value, DateTime periodTo)
        {
            Id = id;
            Pm10Value = pm10Value;
            Pm25Value = pm25Value;
            PeriodTo = periodTo;
        }

        public long Id { get; }

        public double Pm10Value { get; }

        public double Pm25Value { get; }

        public DateTime PeriodTo { get; }
    }
}
