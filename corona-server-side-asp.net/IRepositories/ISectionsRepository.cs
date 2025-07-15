using corona_server_side_asp.net.Models;

namespace corona_server_side_asp.net.IRepositories
{
    public interface ISectionsRepository
    {
        Task<int> AddSectionAsync(SectionModel section);
        Task<List<SectionModel>> GetSectionsAsync();
        Task<int> AddLinksToSection(int sectionId, List<LinkModel> links);
        Task AddTitleAndSubtitleEnglishToLink(int sectionId, int linkId, string titleEnglish, string subtitleEnglish);
    }
}