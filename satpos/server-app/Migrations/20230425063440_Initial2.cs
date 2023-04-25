using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class Initial2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tlestrings",
                columns: table => new
                {
                    noradcatid = table.Column<int>(type: "int", nullable: false),
                    line1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    line2 = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tlestrings", x => x.noradcatid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tlestrings");
        }
    }
}
