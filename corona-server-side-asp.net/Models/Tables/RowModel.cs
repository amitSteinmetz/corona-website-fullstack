using JsonSubTypes;
using Newtonsoft.Json;

namespace corona_server_side_asp.net.Models.Tables
{
    [JsonConverter(typeof(JsonSubtypes), "Type")]
    [JsonSubtypes.KnownSubType(typeof(HospitalBedOccupancyItem), "hospitalBedOccupancy")]
    [JsonSubtypes.KnownSubType(typeof(IncomingPersonsItem), "incomingPersons")]
    [JsonSubtypes.KnownSubType(typeof(TrafficLightProgramItem), "trafficLightProgram")]
    public class RowModel
    {
        public int Id { get; set; }
        public string Type { get; set; }
    }
}
