using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace corona_server_side_asp.net.Migrations
{
    /// <inheritdoc />
    public partial class minireset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TableRows_Tables_HospitalBedOccupancyTableId",
                table: "TableRows");

            migrationBuilder.DropForeignKey(
                name: "FK_TableRows_Tables_IncomingPersonsTableId",
                table: "TableRows");

            migrationBuilder.DropForeignKey(
                name: "FK_TableRows_Tables_TrafficLightProgramTableId",
                table: "TableRows");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TableRows",
                table: "TableRows");

            migrationBuilder.DropIndex(
                name: "IX_TableRows_HospitalBedOccupancyTableId",
                table: "TableRows");

            migrationBuilder.DropIndex(
                name: "IX_TableRows_IncomingPersonsTableId",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "TotalVerifiedPercentage",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "GeneralBedOccupancy",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "HospitalBedOccupancyTableId",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "HospitalName",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "IncomingPersonsTableId",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "InternalDepartmentBedOccupancy",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "RiskLevel",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "SrcCountry",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "VerifiedCitizensAmount",
                table: "TableRows");

            migrationBuilder.DropColumn(
                name: "VerifiedStrangersAmount",
                table: "TableRows");

            migrationBuilder.RenameTable(
                name: "TableRows",
                newName: "TrafficLightProgramItems");

            migrationBuilder.RenameIndex(
                name: "IX_TableRows_TrafficLightProgramTableId",
                table: "TrafficLightProgramItems",
                newName: "IX_TrafficLightProgramItems_TrafficLightProgramTableId");

            migrationBuilder.AlterColumn<double>(
                name: "VerifiedChangeRate",
                table: "TrafficLightProgramItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "PositiveTestsPercentage",
                table: "TrafficLightProgramItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "NewPatientsPer10000People",
                table: "TrafficLightProgramItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "DailyScore",
                table: "TrafficLightProgramItems",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "TrafficLightProgramItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ActivePatients",
                table: "TrafficLightProgramItems",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TrafficLightProgramItems",
                table: "TrafficLightProgramItems",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "HospitalBedOccupancyItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GeneralBedOccupancy = table.Column<double>(type: "float", nullable: false),
                    InternalDepartmentBedOccupancy = table.Column<double>(type: "float", nullable: false),
                    HospitalBedOccupancyTableId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HospitalBedOccupancyItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HospitalBedOccupancyItems_Tables_HospitalBedOccupancyTableId",
                        column: x => x.HospitalBedOccupancyTableId,
                        principalTable: "Tables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "IncomingPersonsItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SrcCountry = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RiskLevel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalAmount = table.Column<int>(type: "int", nullable: false),
                    VerifiedCitizensAmount = table.Column<int>(type: "int", nullable: false),
                    VerifiedStrangersAmount = table.Column<int>(type: "int", nullable: false),
                    TotalVerifiedPercentage = table.Column<double>(type: "float", nullable: true, computedColumnSql: "CASE WHEN [TotalAmount] = 0 THEN NULL ELSE CAST(([VerifiedCitizensAmount] + [VerifiedStrangersAmount]) * 100.0 / [TotalAmount] AS FLOAT) END", stored: true),
                    IncomingPersonsTableId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncomingPersonsItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_IncomingPersonsItems_Tables_IncomingPersonsTableId",
                        column: x => x.IncomingPersonsTableId,
                        principalTable: "Tables",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_HospitalBedOccupancyItems_HospitalBedOccupancyTableId",
                table: "HospitalBedOccupancyItems",
                column: "HospitalBedOccupancyTableId");

            migrationBuilder.CreateIndex(
                name: "IX_IncomingPersonsItems_IncomingPersonsTableId",
                table: "IncomingPersonsItems",
                column: "IncomingPersonsTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TrafficLightProgramItems_Tables_TrafficLightProgramTableId",
                table: "TrafficLightProgramItems",
                column: "TrafficLightProgramTableId",
                principalTable: "Tables",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TrafficLightProgramItems_Tables_TrafficLightProgramTableId",
                table: "TrafficLightProgramItems");

            migrationBuilder.DropTable(
                name: "HospitalBedOccupancyItems");

            migrationBuilder.DropTable(
                name: "IncomingPersonsItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TrafficLightProgramItems",
                table: "TrafficLightProgramItems");

            migrationBuilder.RenameTable(
                name: "TrafficLightProgramItems",
                newName: "TableRows");

            migrationBuilder.RenameIndex(
                name: "IX_TrafficLightProgramItems_TrafficLightProgramTableId",
                table: "TableRows",
                newName: "IX_TableRows_TrafficLightProgramTableId");

            migrationBuilder.AlterColumn<double>(
                name: "VerifiedChangeRate",
                table: "TableRows",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<double>(
                name: "PositiveTestsPercentage",
                table: "TableRows",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "NewPatientsPer10000People",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<double>(
                name: "DailyScore",
                table: "TableRows",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "City",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ActivePatients",
                table: "TableRows",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "TableRows",
                type: "nvarchar(34)",
                maxLength: 34,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "GeneralBedOccupancy",
                table: "TableRows",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HospitalBedOccupancyTableId",
                table: "TableRows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HospitalName",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IncomingPersonsTableId",
                table: "TableRows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "InternalDepartmentBedOccupancy",
                table: "TableRows",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiskLevel",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SrcCountry",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalAmount",
                table: "TableRows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "TableRows",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "VerifiedCitizensAmount",
                table: "TableRows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VerifiedStrangersAmount",
                table: "TableRows",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "TotalVerifiedPercentage",
                table: "TableRows",
                type: "float",
                nullable: true,
                computedColumnSql: "CASE WHEN [TotalAmount] = 0 THEN NULL ELSE CAST(([VerifiedCitizensAmount] + [VerifiedStrangersAmount]) * 100.0 / [TotalAmount] AS FLOAT) END",
                stored: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TableRows",
                table: "TableRows",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_TableRows_HospitalBedOccupancyTableId",
                table: "TableRows",
                column: "HospitalBedOccupancyTableId");

            migrationBuilder.CreateIndex(
                name: "IX_TableRows_IncomingPersonsTableId",
                table: "TableRows",
                column: "IncomingPersonsTableId");

            migrationBuilder.AddForeignKey(
                name: "FK_TableRows_Tables_HospitalBedOccupancyTableId",
                table: "TableRows",
                column: "HospitalBedOccupancyTableId",
                principalTable: "Tables",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TableRows_Tables_IncomingPersonsTableId",
                table: "TableRows",
                column: "IncomingPersonsTableId",
                principalTable: "Tables",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TableRows_Tables_TrafficLightProgramTableId",
                table: "TableRows",
                column: "TrafficLightProgramTableId",
                principalTable: "Tables",
                principalColumn: "Id");
        }
    }
}
