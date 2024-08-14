using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BookStore.Application.Services;
using BookStore.Domain.DTOs;
using BookStore.Domain.Entitess;

namespace BookStore.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(BookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet]
        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _bookService.GetBooks();
        }
        [HttpPost]
        public async Task<IActionResult> AddBook(BookDTO bookDTO)
        {
            if (bookDTO == null)
            {
                return BadRequest("Invalid book data.");
            }

            await _bookService.AddBook(bookDTO);
            return Ok(bookDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, BookDTO bookDTO)
        {
            if (id != bookDTO.Id)
            {
                return BadRequest("Book ID mismatch.");
            }

            var result = await _bookService.UpdateBook(bookDTO);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _bookService.DeleteBook(id);
            if (result)
            {
                return Ok();
            }
            return NotFound();
        }
    }
}
