namespace corona_server_side_asp.net.Models.Tables
{
    public class HospitalBedOccupancyItem
    {
        public int Id { get; set; }
        public string HospitalName { get; set; }
        public string HospitalNameEnglish { get; set; }
        public double GeneralBedOccupancy { get; set; }
        public double InternalDepartmentBedOccupancy { get; set; }
    }

}
