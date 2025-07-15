namespace corona_server_side_asp.net.Models.Tables
{
    public class IncomingPersonsItem
    {
        public int Id { get; set; }
        public string? SrcCountry { get; set; }
        public string? SrcCountryEnglish { get; set; }
        public string RiskLevel { get; set; }
        public int TotalAmount { get; set; }
        public int VerifiedCitizensAmount { get; set; }
        public int VerifiedStrangersAmount { get; set; }
        public double? TotalVerifiedPercentage { get; set; }
    }
}
