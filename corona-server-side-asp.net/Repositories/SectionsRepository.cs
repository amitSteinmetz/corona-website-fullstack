using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.EntityFrameworkCore;
using corona_server_side_asp.net.Models.Tables;

namespace corona_server_side_asp.net.Repositories
{
    public class SectionsRepository : ISectionsRepository
    {
        private readonly CoronaDataContext _context;
        private readonly ICardsRepository _cardsRepository;

        public SectionsRepository(CoronaDataContext context, ICardsRepository cardsRepository)
        {
            _context = context;
            _cardsRepository = cardsRepository;
        }

        public async Task<List<SectionModel>> GetSectionsAsync()
        {
            var sections = await _context.Sections
            .Include(s => s.Cards)
            .Include(s => s.RelatedLinks)
            .Include(s => s.Tables)
                .ThenInclude(t => t.Columns)
            .ToListAsync();

            foreach(var section in sections)
            {
                foreach (var card in section.Cards)
                {
                    await LoadExtraCardData(card);
                }

                foreach (var table in section.Tables)
                {
                    await LoadExtraTableData(table);
                }
            }

            _cardsRepository.WriteExcelDataToCards(ref sections);
            return sections;
        }

        public async Task<int> AddSectionAsync(SectionModel section)
        {
            if (section == null) return -1;

            _context.Sections.Add(section);
            return await _context.SaveChangesAsync();
        }

        public async Task AddTitleAndSubtitleEnglishToLink(int sectionId, int linkId, string titleEnglish, string subtitleEnglish)
        {
            var section = await _context.Sections.Include(s => s.RelatedLinks).FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new Exception("Section not found");

            var link = section.RelatedLinks.Find(l => l.Id == linkId);
            if (link == null) throw new Exception("Link not found");

            link.TitleEnglish = titleEnglish;
            if (subtitleEnglish != null) link.SubTitleEnglish = subtitleEnglish;

            await _context.SaveChangesAsync();
        }

        private async Task LoadExtraCardData(CardModel card)
        {
            switch (card)
            {
                case TextualCardModel textualCard:
                    await _context.Entry(textualCard).Collection(tc => tc.Data).LoadAsync();
                    break;
                case ContainerCardModel containerCard:
                    await _context.Entry(containerCard).Collection(cc => cc.Children).LoadAsync();
                    break;
            }
        }

        private async Task LoadExtraTableData(TableModel table)
        {
            switch (table)
            {
                case IncomingPersonsTable incomingPersonsTable:
                    await _context.Entry(incomingPersonsTable).Collection(it => it.Rows).LoadAsync();
                    break;
                case HospitalBedOccupancyTable hospitalBedOccupancyTable:
                    await _context.Entry(hospitalBedOccupancyTable).Collection(ht => ht.Rows).LoadAsync();
                    break;
                case TrafficLightProgramTable trafficLightProgramTable:
                    await _context.Entry(trafficLightProgramTable).Collection(tt => tt.Rows).LoadAsync();
                    break;
            }
        }

        public async Task<int> AddLinksToSection(int sectionId, List<LinkModel> links)
        {
            var section = _context.Sections
                .Include(s => s.RelatedLinks)
                .FirstOrDefault(s => s.Id == sectionId);

            if (section == null) return -1;

            section.RelatedLinks.AddRange(links);
            return await _context.SaveChangesAsync();
        }
    }
}
