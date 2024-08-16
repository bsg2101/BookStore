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
        public async Task<Book> GetBook(int id)
        {
            return await _bookRepository.GetBookAsync(id);
        }

        public async Task<BookDTO> AddBook(BookDTO bookDTO)
        {
            if (bookDTO == null)
            {
                throw new ArgumentException("Invalid book data.");
            }
            var book = new Book
            {
                Title = bookDTO.Title,
                Author = bookDTO.Author,
                Price = bookDTO.Price,
                PublishedDate = bookDTO.PublishedDate,
                ImgUrl = bookDTO.ImgUrl
            };
            await _bookRepository.AddBookAsync(book);
            bookDTO.Id = book.Id;
            return bookDTO;
        }

        public async Task<BookDTO> UpdateBook(BookDTO bookDTO)
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
                Price = bookDTO.Price,
                PublishedDate = bookDTO.PublishedDate,
                ImgUrl = bookDTO.ImgUrl
            };
            var response = await _bookRepository.UpdateBookAsync(book);
            if (response == null)
            {
                return null;
            }
            bookDTO.Id = response.Id;
            return bookDTO;
        }

        public async Task<bool> DeleteBook(int id)
        {
            return await _bookRepository.DeleteBookAsync(id);
        }
    }
}
