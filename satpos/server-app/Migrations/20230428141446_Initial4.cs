using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class Initial4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "objectname",
                table: "tlestrings",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "objectname",
                table: "tlestrings");
        }
    }
}
