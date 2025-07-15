using corona_server_side_asp.net.Dto;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;

namespace corona_server_side_asp.net.IRepositories
{
    public interface ICardsRepository
    {
        Task AddEnglishPropsToCard(int sectionId, int cardId, CardEnglishProps englishProps);
        Task<int> AddCardToSectionAsync(int sectionId, CardModel card);
        Task<List<CardModel>> GetSectionCardsAsync(int sectionId);
        Task<int> AddChildToContainerCard(int sectionId, int containerCardId, CardModel card);
        Task<string> GetCardSectionTitle(int sectionId);
        Task<CardModel> ChangeGraphDataSource(int sectionId, int cardId, string period);
        //Task<int> AddDescriptionToCard(int sectionId, int cardId, string description);
        void WriteExcelDataToCards(ref List<SectionModel> sections);
        Task<int> DeleteCardFromSection(int sectionId, int cardId);
    }
}