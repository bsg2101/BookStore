using BookStore.Application.Services;
using BookStore.Domain.Entitess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly ContactService _contactService;

        public ContactController(ContactService contactService)
        {
            _contactService = contactService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var contacts = _contactService.GetContacts();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var contact = _contactService.GetContact(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Contact contact)
        {
            if (contact == null)
            {
                return BadRequest();
            }
            _contactService.AddContact(contact);
            return CreatedAtRoute("Get", new { id = contact.Id }, contact);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Contact contact)
        {
            if (contact == null || contact.Id != id)
            {
                return BadRequest();
            }
            var updatedContact = _contactService.UpdateContact(contact);
            if (updatedContact == null)
            {
                return NotFound();
            }
            return Ok(updatedContact);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var contact = _contactService.GetContact(id);
            if (contact == null)
            {
                return NotFound();
            }
            _contactService.DeleteContact(id);
            return NoContent();
        }
    }
}
