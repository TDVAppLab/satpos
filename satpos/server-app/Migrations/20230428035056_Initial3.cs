using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace serverapp.Migrations
{
    public partial class Initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "t_website_setting",
                columns: table => new
                {
                    title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    data = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    memo = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    create_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    create_datetime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    latest_update_user = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    latest_update_datetime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_website_setting", x => x.title);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_website_setting");
        }
    }
}
