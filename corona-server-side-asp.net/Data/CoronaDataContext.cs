using corona_server_side_asp.net.Models;
using corona_server_side_asp.net.Models.Cards;
using corona_server_side_asp.net.Models.Tables;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace corona_server_side_asp.net.Data
{
    public class CoronaDataContext : IdentityDbContext<IdentityUser>
    {
        public CoronaDataContext(DbContextOptions<CoronaDataContext> options) : base(options) { }
        public DbSet<SectionModel> Sections { get; set; }
        public DbSet<CardModel> Cards { get; set; }
        public DbSet<TextualCardModel> TextualCardModels { get; set; }
        public DbSet<GraphicalCardModel> GraphicalCardModels { get; set; }
        public DbSet<ContainerCardModel> ContainerCardModels { get; set; }
        public DbSet<TableModel> Tables { get; set; }
        public DbSet<HospitalBedOccupancyTable> HospitalBedOccupancyTables { get; set; }
        public DbSet<IncomingPersonsTable> IncomingPersonsTables { get; set; }
        public DbSet<TrafficLightProgramTable> TrafficLightProgramTables { get; set; }
        public DbSet<TableColumn> TableColumns { get; set; }
        public DbSet<IncomingPersonsItem> IncomingPersonsItems { get; set; }
        public DbSet<HospitalBedOccupancyItem> HospitalBedOccupancyItems { get; set; }
        public DbSet<TrafficLightProgramItem> TrafficLightProgramItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IncomingPersonsItem>()
                .Property(e => e.TotalVerifiedPercentage)
                .HasComputedColumnSql(
                    "CASE WHEN [TotalAmount] = 0 THEN NULL ELSE CAST(([VerifiedCitizensAmount] + [VerifiedStrangersAmount]) * 100.0 / [TotalAmount] AS FLOAT) END",
                    stored: true // This ensures the column is computed and stored in the database
                );
        }
    }
}
