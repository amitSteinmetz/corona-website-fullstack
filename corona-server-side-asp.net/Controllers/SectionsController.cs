using corona_server_side_asp.net.Dto;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectionsController : ControllerBase
    {
        private readonly ISectionsRepository _sectionsRepository;

        public SectionsController(ISectionsRepository sectionsRepository)
        {
            _sectionsRepository = sectionsRepository;
        }

        [HttpGet("")]
        public async Task<IActionResult> GetSections()
        {
            var sections = await _sectionsRepository.GetSectionsAsync();

            return (sections == null) ? NotFound("No sections found.") : Ok(sections);
        }

        [HttpPost("")]
        public async Task<IActionResult> AddSection([FromBody] SectionModel section)
        {

            var result = await _sectionsRepository.AddSectionAsync(section);
            return CreatedAtAction(nameof(AddSection), new { id = section.Id }, section);
        }

        [HttpPost("{sectionId}/links")]
        public async Task<IActionResult> AddLinksToSection(int sectionId, [FromBody] List<LinkModel> links)
        {
            if (links == null || links.Count == 0) return BadRequest("No links provided.");

            var result = await _sectionsRepository.AddLinksToSection(sectionId, links);
            return (result != -1) ? Ok("Links added successfully.") : NotFound("Section not found.");
        }

        [HttpPatch("add-title-english/{sectionId}/{linkId}")]
        public async Task<IActionResult> AddTitleAndSubtitleEnglishToLink(int sectionId, int linkId,
            [FromBody] LinkTitles titlesEnglish)
        {
            if (sectionId <= 0) return BadRequest("sectionId not valid");
            try
            {
                await _sectionsRepository.AddTitleAndSubtitleEnglishToLink(sectionId, linkId, titlesEnglish.TitleEnglish, titlesEnglish.SubtitleEnglish);
                return Ok("Title english added successfully");
            }
            catch (Exception ex)
            {
                return NotFound("Section Not found");
            }
        }
    }
}
