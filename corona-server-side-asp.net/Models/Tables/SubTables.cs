namespace corona_server_side_asp.net.Models.Tables
{
    public class HospitalBedOccupancyTable : TableModel
    {
        public List<HospitalBedOccupancyItem> Rows { get; set; } = new();
    }

    public class IncomingPersonsTable : TableModel
    {
        public List<IncomingPersonsItem> Rows { get; set; } = new();
    }
    public class TrafficLightProgramTable : TableModel
    {
        public List<TrafficLightProgramItem> Rows { get; set; } = new();
    }
}