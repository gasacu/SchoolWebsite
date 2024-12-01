using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SchoolSite.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTeamMemberDepartmentProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Bio",
                table: "TeamMembers",
                newName: "Specialty");

            migrationBuilder.AddColumn<string>(
                name: "Faculty",
                table: "TeamMembers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Faculty",
                table: "TeamMembers");

            migrationBuilder.RenameColumn(
                name: "Specialty",
                table: "TeamMembers",
                newName: "Bio");
        }
    }
}
