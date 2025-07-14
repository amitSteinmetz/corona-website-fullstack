using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class addenglishpropertietotextualDataModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TextEnglish",
                table: "CardTextDataModel",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TextEnglish",
                table: "CardTextDataModel");
        }
    }
}
