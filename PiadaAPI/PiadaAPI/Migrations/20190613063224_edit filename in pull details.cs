using Microsoft.EntityFrameworkCore.Migrations;

namespace PiadaAPI.Migrations
{
    public partial class editfilenameinpulldetails : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FIleName",
                table: "PullDetails",
                newName: "FileName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "FileName",
                table: "PullDetails",
                newName: "FIleName");
        }
    }
}
