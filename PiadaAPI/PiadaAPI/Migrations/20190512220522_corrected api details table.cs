using Microsoft.EntityFrameworkCore.Migrations;

namespace PiadaAPI.Migrations
{
    public partial class correctedapidetailstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ApiToken",
                table: "APIDetails",
                newName: "AccessTokenSecret");

            migrationBuilder.RenameColumn(
                name: "ApiSecretToken",
                table: "APIDetails",
                newName: "AccessToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AccessTokenSecret",
                table: "APIDetails",
                newName: "ApiToken");

            migrationBuilder.RenameColumn(
                name: "AccessToken",
                table: "APIDetails",
                newName: "ApiSecretToken");
        }
    }
}
