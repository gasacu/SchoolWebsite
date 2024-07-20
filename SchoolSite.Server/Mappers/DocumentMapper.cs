using SchoolSite.Server.DTOs;
using SchoolSite.Server.Entities;

namespace SchoolSite.Server.Mappers
{
    public static class DocumentMapper
    {
        public static Document ToDocument(DocumentDto documentDto)
        {
            return new Document
            {
                Id = documentDto.Id,
                Title = documentDto.Title,
                DocumentUrl = documentDto.DocumentUrl,
                IsEvent = documentDto.IsEvent,
                AdminId = documentDto.AdminId,
                Admin = documentDto.Admin,
                Events = documentDto.Events
            };
        }

        public static DocumentDto ToDocumentDto(Document document)
        {
            return new DocumentDto
            {
                Id = document.Id,
                Title = document.Title,
                DocumentUrl = document.DocumentUrl,
                IsEvent = document.IsEvent,
                AdminId = document.AdminId,
                Admin = document.Admin,
                Events = document.Events
            };
        }
    }
}
