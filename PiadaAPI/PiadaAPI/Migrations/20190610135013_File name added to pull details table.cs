using Microsoft.EntityFrameworkCore.Migrations;

namespace PiadaAPI.Migrations
{
    public partial class Filenameaddedtopulldetailstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FIleName",
                table: "PullDetails",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FIleName",
                table: "PullDetails");
        }
    }
}
