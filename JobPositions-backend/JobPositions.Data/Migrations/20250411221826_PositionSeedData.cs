using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace JobPositions.Data.Migrations
{
    /// <inheritdoc />
    public partial class PositionSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Positions",
                columns: new[] { "Id", "Budget", "CreatedDate", "DepartmentId", "ModifiedDate", "Number", "RecruiterId", "StatusId", "Title" },
                values: new object[,]
                {
                    { 1, 6000m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, 200, 1, 2, "Full-Stack Developer" },
                    { 2, 3000m, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 1, null, 201, 2, 1, "QA Engineer" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Positions",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
