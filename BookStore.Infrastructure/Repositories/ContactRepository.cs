using BookStore.Domain.Entitess;
using BookStore.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Infrastructure.Repositories
{
    public class ContactRepository

    {
        private readonly ApplicationDbContext _context;

        public ContactRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
           var contacts = await Task.FromResult(_context.Contacts.ToList());
            return contacts;
        }

        public async Task<Contact> GetContactAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            return contact;
        }

        public async Task<Contact> AddContactAsync(Contact contact)
        {
           var addContact = _context.Contacts.AddAsync(contact);
           await _context.SaveChangesAsync();
           return addContact.IsCompletedSuccessfully ? addContact.Result.Entity : null;
        }

        public async Task UpdateContactAsync(Contact contact)
        {
           _context.Contacts.Update(contact);
        }

        public async Task DeleteContactAsync(int id)
        {
            // Implementation will be added soon
            throw new NotImplementedException();
        }
    }
}
