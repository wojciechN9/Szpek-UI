namespace UI.Controllers.Model
{
    public class AddressRead
    {
        public AddressRead(long id, string city, string street, string postCode, string voivodeship, string countryCode, decimal latitude, decimal longitude)
        {
            Id = id;
            City = city;
            Street = street;
            PostCode = postCode;
            Voivodeship = voivodeship;
            CountryCode = countryCode;
            Latitude = latitude;
            Longitude = longitude;
        }

        public long Id { get; }

        public string City { get; }

        public string Street { get; }

        public string PostCode { get; }

        public string Voivodeship { get; }

        public string CountryCode { get; }

        public decimal Latitude { get; set; }

        public decimal Longitude { get; set; }
    }
}
