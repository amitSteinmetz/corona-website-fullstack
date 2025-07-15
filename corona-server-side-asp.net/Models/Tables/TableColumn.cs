namespace corona_server_side_asp.net.Models.Tables
{
    public class TableColumn
    {
        public int Id { get; set; }
        public string Key { get; set; }
        public string KeyEnglish { get; set; }
        public string Value { get; set; }
        public string ValueEnglish { get; set; }
        public bool InPercentages { get; set; }
    }
}
