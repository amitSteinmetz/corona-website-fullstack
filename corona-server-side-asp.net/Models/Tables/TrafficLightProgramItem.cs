namespace corona_server_side_asp.net.Models.Tables
{
    public class TrafficLightProgramItem 
    {
        public int Id { get; set; }
        public string City { get; set; }
        public double DailyScore { get; set; }
        public string NewPatientsPer10000People { get; set; }
        public double PositiveTestsPercentage { get; set; }
        public double VerifiedChangeRate { get; set; }
        public int ActivePatients { get; set; }
    }
}
