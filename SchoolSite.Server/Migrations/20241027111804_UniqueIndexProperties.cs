using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class UniqueIndexProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "GalleryImages",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DocumentUrl",
                table: "Documents",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_GalleryImages_ImagePath",
                table: "GalleryImages",
                column: "ImagePath",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_DocumentUrl",
                table: "Documents",
                column: "DocumentUrl",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_GalleryImages_ImagePath",
                table: "GalleryImages");

            migrationBuilder.DropIndex(
                name: "IX_Documents_DocumentUrl",
                table: "Documents");

            migrationBuilder.AlterColumn<string>(
                name: "ImagePath",
                table: "GalleryImages",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "DocumentUrl",
                table: "Documents",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
