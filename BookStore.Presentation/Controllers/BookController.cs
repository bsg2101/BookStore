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
        [HttpGet("{id}")]
        public async Task<Book> GetBook(int id)
        {
            return await _bookService.GetBook(id);
        }
        [HttpPost]
        public async Task<IActionResult> AddBook([FromBody] BookDTO bookDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _bookService.AddBook(bookDTO);
            if (response == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Book could not be added.");
            }
            return CreatedAtAction(nameof(GetBook), new { id = response.Id }, response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, BookDTO bookDTO)
        {
            if (id != bookDTO.Id)
            {
                return BadRequest("Book ID mismatch.");
            }

            var result = await _bookService.UpdateBook(bookDTO);
            if (result != null)
            {
                return Ok(result);
            }
            return NotFound();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _bookService.DeleteBook(id);
            if (result)
            {
                return Ok($"İşlem başarılı {id} numaralı silindi!");
            }
            return NotFound("id bulunamadı");
        }
    }
}
