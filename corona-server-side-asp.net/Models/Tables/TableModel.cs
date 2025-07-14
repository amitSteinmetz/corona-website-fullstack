using corona_server_side_asp.net.Models.Cards;
using JsonSubTypes;
using Newtonsoft.Json;

namespace corona_server_side_asp.net.Models.Tables
{
    [JsonConverter(typeof(JsonSubtypes), "Type")]
    [JsonSubtypes.KnownSubType(typeof(HospitalBedOccupancyTable), "hospitalBedOccupancy")]
    [JsonSubtypes.KnownSubType(typeof(IncomingPersonsTable), "incomingPersons")]
    [JsonSubtypes.KnownSubType(typeof(TrafficLightProgramTable), "trafficLightProgram")]
    public class TableModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEnglish { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public string DescriptionEnglish { get; set; }
        public List<TableColumn> Columns { get; set; } = new();
    }
}
