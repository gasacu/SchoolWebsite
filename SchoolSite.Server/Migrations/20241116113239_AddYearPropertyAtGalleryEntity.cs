using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddYearPropertyAtGalleryEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Year",
                table: "Galleries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "Galleries");
        }
    }
}
