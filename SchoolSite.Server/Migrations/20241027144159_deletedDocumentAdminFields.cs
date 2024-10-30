using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class deletedDocumentAdminFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_Admins_AdminId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_AdminId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Documents");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Documents",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_AdminId",
                table: "Documents",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_Admins_AdminId",
                table: "Documents",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
