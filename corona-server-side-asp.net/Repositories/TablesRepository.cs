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

        public async Task AddRowToTable<T>(int sectionId, int tableId, T row)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)  
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            if (table is TrafficLightProgramTable trafficLightProgramTable)
            {
                if (row is not TrafficLightProgramItem trafficLightRow)
                    throw new ArgumentException("Row must be of type TrafficLightProgramItem");
                trafficLightProgramTable.Rows.Add(trafficLightRow);
            }
            else if (table is IncomingPersonsTable incomingPersonsTable)
            {
                if (row is not IncomingPersonsItem incomingPersonsRow)
                    throw new ArgumentException("Row must be of type IncomingPersonsItem");
                incomingPersonsTable.Rows.Add(incomingPersonsRow);
            }
            else if (table is HospitalBedOccupancyTable hospitalBedOccupancyTable)
            {
                if (row is not HospitalBedOccupancyItem hospitalBedRow)
                    throw new ArgumentException("Row must be of type HospitalBedOccupancyItem");
                hospitalBedOccupancyTable.Rows.Add(hospitalBedRow);
            }
            else throw new ArgumentException("Unsupported table type");
            
            await _context.SaveChangesAsync();
        }

        public async Task EditRow<T>(int sectionId, int tableId, int rowId ,T row)
        {
            var section = await _context.Sections
                .Include(s => s.Tables)
                .FirstOrDefaultAsync(s => s.Id == sectionId);
            if (section == null) throw new ArgumentException("Section not found");

            var table = section.Tables.FirstOrDefault(t => t.Id == tableId);
            if (table == null) throw new ArgumentException("Table not found in the specified section");

            if (table is TrafficLightProgramTable trafficLightProgramTable)
            {
                if (row is not TrafficLightProgramItem trafficLightRow)
                    throw new ArgumentException("Row must be of type TrafficLightProgramItem");

                await _context.Entry(trafficLightProgramTable).Collection(tt => tt.Rows).LoadAsync();

                var existingRow = trafficLightProgramTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (existingRow == null) throw new ArgumentException("Row not found in the TrafficLightProgramTable");

                existingRow.ActivePatients = trafficLightRow.ActivePatients;
                existingRow.City = trafficLightRow.City;
                existingRow.DailyScore = trafficLightRow.DailyScore;
                existingRow.NewPatientsPer10000People = trafficLightRow.NewPatientsPer10000People;
                existingRow.PositiveTestsPercentage = trafficLightRow.PositiveTestsPercentage;
                existingRow.VerifiedChangeRate = trafficLightRow.VerifiedChangeRate;
            }
            else if (table is IncomingPersonsTable incomingPersonsTable)
            {
                if (row is not IncomingPersonsItem incomingPersonsRow)
                    throw new ArgumentException("Row must be of type IncomingPersonsItem");

                await _context.Entry(incomingPersonsTable).Collection(tt => tt.Rows).LoadAsync();

                IncomingPersonsItem? existingRow = incomingPersonsTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (existingRow == null) throw new ArgumentException("Row not found in the IncomingPersonsTable");

                existingRow.RiskLevel = incomingPersonsRow.RiskLevel;
                existingRow.SrcCountry = incomingPersonsRow.SrcCountry;
                existingRow.TotalAmount = incomingPersonsRow.TotalAmount;
                existingRow.VerifiedCitizensAmount = incomingPersonsRow.VerifiedCitizensAmount;
                existingRow.VerifiedStrangersAmount = incomingPersonsRow.VerifiedStrangersAmount;
                //existingRow.TotalVerifiedPercentage =
                //((incomingPersonsRow.VerifiedCitizensAmount + incomingPersonsRow.VerifiedStrangersAmount) * 100) / incomingPersonsRow.TotalAmount;
            }
            else if (table is HospitalBedOccupancyTable hospitalBedOccupancyTable)
            {
                if (row is not HospitalBedOccupancyItem hospitalBedRow)
                    throw new ArgumentException("Row must be of type HospitalBedOccupancyItem");

                await _context.Entry(hospitalBedOccupancyTable).Collection(tt => tt.Rows).LoadAsync();

                var existingRow = hospitalBedOccupancyTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (existingRow == null) throw new ArgumentException("Row not found in the HospitalBedOccupancyTable");

                existingRow.HospitalName = hospitalBedRow.HospitalName;
                existingRow.InternalDepartmentBedOccupancy = hospitalBedRow.InternalDepartmentBedOccupancy;
                existingRow.GeneralBedOccupancy = hospitalBedRow.GeneralBedOccupancy;
            }
            else throw new ArgumentException("Unsupported table type");

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

                var row = incomingPersonsTable.Rows.FirstOrDefault(r => r.Id == rowId);
                if (row == null) throw new ArgumentException("Row not found in the IncomingPersonsTable");
                //incomingPersonsTable.Rows.Remove(row);
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
                //hospitalBedOccupancyTable.Rows.Remove(row);
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
                //trafficLightProgramTable.Rows.Remove(row);
                _context.TrafficLightProgramItems.Remove(row);
            }

            await _context.SaveChangesAsync();
        }
    }
}
