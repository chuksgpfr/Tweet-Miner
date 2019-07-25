using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PiadaAPI.Migrations
{
    public partial class addedpulldetailstable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PullDetails",
                columns: table => new
                {
                    ID = table.Column<Guid>(nullable: false),
                    UserID = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    Keyword = table.Column<string>(nullable: true),
                    Quantity = table.Column<int>(nullable: false),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PullDetails", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PullDetails_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PullDetails_UserID",
                table: "PullDetails",
                column: "UserID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PullDetails");
        }
    }
}
