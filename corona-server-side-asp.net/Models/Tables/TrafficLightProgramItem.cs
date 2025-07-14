namespace corona_server_side_asp.net.Models.Tables
{
    public class TrafficLightProgramItem 
    {
        public int Id { get; set; }
        public string City { get; set; }
        public string CityEnglish { get; set; }
        public double DailyScore { get; set; }
        public double NewPatientsPer10000People { get; set; }
        public double PositiveTestsPercentage { get; set; }
        public double VerifiedChangeRate { get; set; }
        public int ActivePatients { get; set; }
    }
}
