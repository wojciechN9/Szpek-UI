using System;
using System.Collections.Generic;

namespace UI.Controllers.Model
{
    public class LocationMeassurements
    {
        public LocationMeassurements(
            long id,
            AddressRead address,
            IEnumerable<MeassurementRead> meassurements)
        {
            Id = id;
            Address = address;
            Meassurements = meassurements;
        }

        public long Id { get; }

        public AddressRead Address { get; }

        public IEnumerable<MeassurementRead> Meassurements { get; }
    }
}


