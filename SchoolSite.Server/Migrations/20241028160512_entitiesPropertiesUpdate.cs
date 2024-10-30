using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class entitiesPropertiesUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Galleries_Admins",
                table: "Galleries");

            migrationBuilder.DropIndex(
                name: "IX_Galleries_AdminId",
                table: "Galleries");

            migrationBuilder.DropColumn(
                name: "AdminId",
                table: "Galleries");

            migrationBuilder.RenameColumn(
                name: "UploadedAt",
                table: "GalleryImages",
                newName: "CreatedDate");

            migrationBuilder.AlterColumn<string>(
                name: "PageName",
                table: "PageContents",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "PageContents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedDate",
                table: "PageContents",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_PageContents_PageName",
                table: "PageContents",
                column: "PageName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_PageContents_PageName",
                table: "PageContents");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "PageContents");

            migrationBuilder.DropColumn(
                name: "UpdatedDate",
                table: "PageContents");

            migrationBuilder.RenameColumn(
                name: "CreatedDate",
                table: "GalleryImages",
                newName: "UploadedAt");

            migrationBuilder.AlterColumn<string>(
                name: "PageName",
                table: "PageContents",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<int>(
                name: "AdminId",
                table: "Galleries",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Galleries_AdminId",
                table: "Galleries",
                column: "AdminId");

            migrationBuilder.AddForeignKey(
                name: "FK_Galleries_Admins",
                table: "Galleries",
                column: "AdminId",
                principalTable: "Admins",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
