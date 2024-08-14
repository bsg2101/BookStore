using BookStore.Domain.DTOs;
using BookStore.Domain.Entitess;
using BookStore.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Application.Services
{
    public class BookService
    {
        private readonly BookRepository _bookRepository;

        public BookService(BookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _bookRepository.GetBooksAsync();
        }
        public async Task AddBook(BookDTO bookDTO)
        {

            if (string.IsNullOrEmpty(bookDTO.Title) || string.IsNullOrEmpty(bookDTO.Author))
            {
                throw new ArgumentException("Book title and author are required.");
            }
            // Mapping DTO to Entity
            var book = new Book
            {
                Title = bookDTO.Title,
                Author = bookDTO.Author,
                PublishedDate = bookDTO.PublishedDate
            };
            await _bookRepository.AddBookAsync(book);
        }

        public async Task<bool> UpdateBook(BookDTO bookDTO)
        {
            if (bookDTO == null || bookDTO.Id <= 0)
            {
                throw new ArgumentException("Invalid book data.");
            }

            var book = new Book
            {
                Id = bookDTO.Id,
                Title = bookDTO.Title,
                Author = bookDTO.Author,
                PublishedDate = bookDTO.PublishedDate
            };
            return await _bookRepository.UpdateBookAsync(book);
        }

        public async Task<bool> DeleteBook(int id)
        {
            return await _bookRepository.DeleteBookAsync(id);
        }
    }
}
