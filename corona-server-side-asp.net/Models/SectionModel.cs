using corona_server_side_asp.net.Models.Cards;
using corona_server_side_asp.net.Models.Tables;

namespace corona_server_side_asp.net.Models
{
    public class SectionModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string TitleEnglish { get; set; }
        public List<LinkModel> RelatedLinks { get; set; } = new();
        public List<CardModel> Cards { get; set; } = new();
        public List<TableModel> Tables { get; set; } = new();
    }
}
