using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class addenglishproperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "LinkModel",
                newName: "TitleEngilsh");

            migrationBuilder.AlterColumn<double>(
                name: "NewPatientsPer10000People",
                table: "TrafficLightProgramItems",
                type: "float",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "CityEnglish",
                table: "TrafficLightProgramItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "DescriptionEnglish",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TitleEnglish",
                table: "Tables",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ValueEnglish",
                table: "TableColumns",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TitleEnglish",
                table: "Sections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ShortenUrl",
                table: "LinkModel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SubTitleEnglish",
                table: "LinkModel",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SrcCountryEnglish",
                table: "IncomingPersonsItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "HospitalNameEnglish",
                table: "HospitalBedOccupancyItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExcelFileNameEnglish",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OptionsEnglish",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TitleEnglish",
                table: "Cards",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CityEnglish",
                table: "TrafficLightProgramItems");

            migrationBuilder.DropColumn(
                name: "DescriptionEnglish",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "TitleEnglish",
                table: "Tables");

            migrationBuilder.DropColumn(
                name: "ValueEnglish",
                table: "TableColumns");

            migrationBuilder.DropColumn(
                name: "TitleEnglish",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "ShortenUrl",
                table: "LinkModel");

            migrationBuilder.DropColumn(
                name: "SubTitleEnglish",
                table: "LinkModel");

            migrationBuilder.DropColumn(
                name: "SrcCountryEnglish",
                table: "IncomingPersonsItems");

            migrationBuilder.DropColumn(
                name: "HospitalNameEnglish",
                table: "HospitalBedOccupancyItems");

            migrationBuilder.DropColumn(
                name: "ExcelFileNameEnglish",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "OptionsEnglish",
                table: "Cards");

            migrationBuilder.DropColumn(
                name: "TitleEnglish",
                table: "Cards");

            migrationBuilder.RenameColumn(
                name: "TitleEngilsh",
                table: "LinkModel",
                newName: "Name");

            migrationBuilder.AlterColumn<string>(
                name: "NewPatientsPer10000People",
                table: "TrafficLightProgramItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");
        }
    }
}
