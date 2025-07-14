using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace corona_server_side_asp.net.Models.Cards
{
    public class CardTextDataModel
    {
        public int Id { get; set; }
        public string Amount { get; set; }
        public string? Text { get; set; }
        public string? TextEnglish { get; set; }
    }
}
