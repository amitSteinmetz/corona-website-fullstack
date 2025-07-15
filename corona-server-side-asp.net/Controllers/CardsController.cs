using corona_server_side_asp.net.Dto;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardsController : ControllerBase
    {
        private readonly ICardsRepository _cardsRepository;
        private readonly IWebHostEnvironment _env;

        public CardsController(ICardsRepository cardsRepository, IWebHostEnvironment env)
        {
            _cardsRepository = cardsRepository;
            _env = env;
        }

        [HttpPatch("add-english-props/{sectionId}/{cardId}")]
        public async Task<IActionResult> AddEnglishPropsToCard(int sectionId, int cardId, [FromBody] CardEnglishProps englishProps)
        {
            if (sectionId <= 0 || cardId <= 0) return BadRequest("Invalid section or card id");

            try
            {
                await _cardsRepository.AddEnglishPropsToCard(sectionId, cardId, englishProps);
                return Ok("Ensligh props added to card successfully");
            } catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("{sectionId}")]
        public async Task<IActionResult> AddCardToSection(int sectionId, [FromBody] CardModel card)
        {
            if (sectionId <= 0 || card == null) return BadRequest("Invalid section ID or card data.");
            
            if (card.Type != "container")
            {
                if (string.IsNullOrEmpty(card.ExcelFileName))
                    return BadRequest("Excel file name is required for non-container cards.");
                
                else
                {
                    var sectionTitle = await GetSectionTitle(sectionId);
                    var excelPath = Path.Combine(_env.ContentRootPath, "Excels", "Sections" ,sectionTitle, card.ExcelFileName);

                    if (!System.IO.File.Exists(excelPath))
                    {
                        return BadRequest($"Excel file path '{excelPath}' not found.");
                    }
                }
            }

            var result = await _cardsRepository.AddCardToSectionAsync(sectionId, card);

            return (result != -1) ? Ok("Card added successfully.") : NotFound("Section not found.");
        }

        [HttpGet("{sectionId}")]
        public async Task<IActionResult> GetSectionCards(int sectionId)
        {
            var cards = await _cardsRepository.GetSectionCardsAsync(sectionId);
            return (cards != null) ? Ok(cards) : NotFound("No cards here");
        }

        [HttpPost("{sectionId}/{containerCardId}")]
        public async Task<IActionResult> AddChildToContainerCard(int sectionId, int containerCardId, [FromBody] CardModel card)
        {
            // Edge cases check
            if (sectionId <= 0 || containerCardId <= 0) return BadRequest("Invalid section ID or card ID.");

            var result = await _cardsRepository.AddChildToContainerCard(sectionId, containerCardId, card);

            if (result == -1) return NotFound("Section or container card not found.");

            return Ok("Child card added successfully.");
        }

        [HttpPut("{sectionId}/{cardId}")]
        public async Task<IActionResult> ChangeGraphDataSource(int sectionId, int cardId, [FromBody] string timeRange)
        {
            // Edge cases check
            if (sectionId <= 0 || cardId <= 0 || string.IsNullOrEmpty(timeRange))
            {
                return BadRequest("Invalid section ID, card ID, or period.");
            }

            var updatedCard = await _cardsRepository.ChangeGraphDataSource(sectionId, cardId, timeRange);
            return (updatedCard != null) ? Ok(updatedCard) : NotFound("Card not found.");
        }

        //[HttpPost("add-description/{sectionId}/{cardId}")]
        //public async Task<IActionResult> AddDescriptionToCard(int sectionId, int cardId, [FromBody] string description)
        //{
        //    // Edge cases check
        //    if (sectionId <= 0 || cardId <= 0 || string.IsNullOrEmpty(description))
        //    {
        //        return BadRequest("Invalid section ID, card ID, or description.");
        //    }

        //    var result = await _cardsRepository.AddDescriptionToCard(sectionId, cardId, description);
        //    if (result == -1) return NotFound("Section or card not found.");
        //    return Ok("Description added successfully.");
        //}

        [HttpDelete("")]
        public async Task<IActionResult> DeleteCardFromSection(int sectionId, int cardId)
        {
            // Edge cases check
            if (sectionId <= 0 || cardId <= 0) return BadRequest("Invalid section ID or card ID.");
            var result = await _cardsRepository.DeleteCardFromSection(sectionId, cardId);
            return (result != -1) ? Ok("Card deleted successfully.") : NotFound("Section or card not found.");
        }

        private async Task<string> GetSectionTitle(int sectionId)
        {
            var title = await _cardsRepository.GetCardSectionTitle(sectionId);
            return title;
        }
    }
}
