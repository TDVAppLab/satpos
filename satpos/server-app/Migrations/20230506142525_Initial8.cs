using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class Initial8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "latest_update_datetime",
                table: "tlestrings",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "latest_update_datetime",
                table: "tlestrings");
        }
    }
}
