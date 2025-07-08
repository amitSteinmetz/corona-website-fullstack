using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class addidpropertytoincomingPersonsItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IncomingPersonsItems",
                table: "IncomingPersonsItems");

            migrationBuilder.AlterColumn<string>(
                name: "SrcCountry",
                table: "IncomingPersonsItems",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "IncomingPersonsItems",
                type: "int",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncomingPersonsItems",
                table: "IncomingPersonsItems",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_IncomingPersonsItems",
                table: "IncomingPersonsItems");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "IncomingPersonsItems");

            migrationBuilder.AlterColumn<string>(
                name: "SrcCountry",
                table: "IncomingPersonsItems",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_IncomingPersonsItems",
                table: "IncomingPersonsItems",
                column: "SrcCountry");
        }
    }
}
