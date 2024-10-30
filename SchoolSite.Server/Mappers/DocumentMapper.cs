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
                IsEvent = documentDto.IsEvent
            };
        }

        public static DocumentDto ToDocumentDto(Document document)
        {
            return new DocumentDto
            {
                Id = document.Id,
                Title = document.Title,
                DocumentUrl = document.DocumentUrl,
                IsEvent = document.IsEvent
            };
        }
    }
}
