using System;

namespace UI.Controllers.Model
{
    public class MeassurementRead
    {
        public MeassurementRead(
            long id,
            AirQuality airQuality,
            double pm10Value, 
            AirQuality pm10Quality,
            double pm25Value,
            AirQuality pm25Quality,
            DateTime periodTo)
        {
            Id = id;
            AirQuality = airQuality;
            Pm10Value = pm10Value;
            Pm10Quality = pm10Quality;
            Pm25Value = pm25Value;
            Pm25Quality = pm25Quality;
            PeriodTo = periodTo;
        }

        public long Id { get; }

        public AirQuality AirQuality { get; }

        public double Pm10Value { get; }

        public AirQuality Pm10Quality { get; }

        public double Pm25Value { get; }

        public AirQuality Pm25Quality { get; }

        public DateTime PeriodTo { get; }
    }
}
