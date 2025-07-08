using corona_server_side_asp.net.Data;
using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Cards;
using corona_server_side_asp.net.Models.Tables;
using Microsoft.EntityFrameworkCore;

namespace corona_server_side_asp.net.Repositories
{
    public class TablesRepository : ITablesRepository
    {
        private readonly CoronaDataContext _context;

        public TablesRepository(CoronaDataContext context)
        {
            _context = context;
        }

        public async Task<int> AddTableToSection(int sectionId, TableModel table)
        {
            var section = await _context.Sections
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            section.Tables.Add(table);
            return await _context.SaveChangesAsync();
        }

        public async Task<TableModel> GetTable(int sectionId, int tableId)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);

            if (section == null) throw new ArgumentException("Section not found");
            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            return table;
        }

        public async Task<int> DeleteTable(int sectionId, int tableId)
        {
            var section = await _context.Sections.FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");


            var table = _context.Tables.Include(t => t.Columns).FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            _context.TableColumns.RemoveRange(table.Columns);

            if (table is IncomingPersonsTable)
            {
                var incomingPersonsTable = _context.Tables
                    .OfType<IncomingPersonsTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("IncomingPersonsTable not found in the specified section");
                _context.IncomingPersonsItems.RemoveRange(incomingPersonsTable.Rows);
            }
            else if (table is HospitalBedOccupancyTable)
            {
                var hospitalBedOccupancyTable = _context.Tables
                    .OfType<HospitalBedOccupancyTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("HospitalBedOccupancyTable not found in the specified section");
                _context.HospitalBedOccupancyItems.RemoveRange(hospitalBedOccupancyTable.Rows);
            }
            else if (table is TrafficLightProgramTable)
            {
                var trafficLightProgramTable = _context.Tables
                    .OfType<TrafficLightProgramTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("TrafficLightProgramTable not found in the specified section");
                _context.TrafficLightProgramItems.RemoveRange(trafficLightProgramTable.Rows);
            }

            _context.Tables.Remove(table);
            return await _context.SaveChangesAsync();
        }

        public async Task AddRowToTable(int sectionId, int tableId, object row)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            switch (table)
            {
                case IncomingPersonsTable incomingPersonsTable:
                    var incomingPersonsRow = row as IncomingPersonsItem;
                    if (incomingPersonsRow == null)
                        throw new ArgumentException("Row must be of type IncomingPersonsItem for IncomingPersonsTable");
                    incomingPersonsTable.Rows.Add(incomingPersonsRow);
                    break;
                case HospitalBedOccupancyTable hospitalBedOccupancyTable:
                    var hospitalBedRow = row as HospitalBedOccupancyItem;
                    if (hospitalBedRow == null)
                        throw new ArgumentException("Row must be of type HospitalBedOccupancyItem for HospitalBedOccupancyTable");
                    hospitalBedOccupancyTable.Rows.Add(hospitalBedRow);
                    break;
                case TrafficLightProgramTable trafficLightProgramTable:
                    var trafficLightRow = row as TrafficLightProgramItem;
                    if (trafficLightRow == null)
                        throw new ArgumentException("Row must be of type TrafficLightProgramItem for TrafficLightProgramTable");
                    trafficLightProgramTable.Rows.Add(trafficLightRow);
                    break;
                default:
                    throw new ArgumentException("Unsupported table type");
            }

            await _context.SaveChangesAsync();
        }

        public async Task DeleteRowFromTable(int sectionId, int tableId, int rowId)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");


            if (table is IncomingPersonsTable)
            {
                var incomingPersonsTable = _context.Tables
                    .OfType<IncomingPersonsTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("IncomingPersonsTable not found in the specified section");

                var row= incomingPersonsTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (row == null) throw new ArgumentException("Row not found in the IncomingPersonsTable");
                incomingPersonsTable.Rows.Remove(row);
                _context.IncomingPersonsItems.Remove(row);
            }
            else if (table is HospitalBedOccupancyTable)
            {
                var hospitalBedOccupancyTable = _context.Tables
                    .OfType<HospitalBedOccupancyTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("HospitalBedOccupancyTable not found in the specified section");

                var row = hospitalBedOccupancyTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (row == null) throw new ArgumentException("Row not found in the IncomingPersonsTable");
                hospitalBedOccupancyTable.Rows.Remove(row);
                _context.HospitalBedOccupancyItems.Remove(row);
            }
            else if (table is TrafficLightProgramTable)
            {
                var trafficLightProgramTable = _context.Tables
                    .OfType<TrafficLightProgramTable>()
                    .Include(t => t.Rows)
                    .FirstOrDefault(t => t.Id == tableId) ?? throw new ArgumentException("TrafficLightProgramTable not found in the specified section");

                var row = trafficLightProgramTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (row == null) throw new ArgumentException("Row not found in the IncomingPersonsTable");
                trafficLightProgramTable.Rows.Remove(row);
                _context.TrafficLightProgramItems.Remove(row);
            }

           await _context.SaveChangesAsync();
        }
    }
}
