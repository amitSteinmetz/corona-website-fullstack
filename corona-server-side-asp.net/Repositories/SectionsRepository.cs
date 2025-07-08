using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Repositories;
using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;
using System.Text.Json;
using static System.Collections.Specialized.BitVector32;
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
            await PreloadSubTypes();

            var sections = await _context.Sections
            .Include(s => s.Cards)
            .Include(s => s.RelatedLinks)
            .Include(s => s.Tables)
                .ThenInclude(t => t.Columns)
            .ToListAsync();
               
            _cardsRepository.WriteExcelDataToCards(ref sections);
            return sections;
        }

        public async Task<int> AddSectionAsync(SectionModel section)
        {
            if (section == null) return -1;

            _context.Sections.Add(section);
            return await _context.SaveChangesAsync();
        }

        private async Task PreloadSubTypes()
        {
            await _context.Set<TextualCardModel>().Include(tc => tc.Data).LoadAsync();
            await _context.Set<ContainerCardModel>().Include(cc => cc.Children).LoadAsync();
            await _context.Set<GraphicalCardModel>().LoadAsync();
            await _context.Set<HospitalBedOccupancyTable>().Include(ht => ht.Rows).LoadAsync();
            await _context.Set<IncomingPersonsTable>().Include(it => it.Rows).LoadAsync();
            await _context.Set<TrafficLightProgramTable>().Include(tt => tt.Rows).LoadAsync();
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
