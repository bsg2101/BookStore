using BookStore.Domain.Entitess;
using BookStore.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Application.Services
{
   public class ContactService
    {
        private readonly ContactRepository _contactRepository;

        public ContactService(ContactRepository contactRepository)
        {
            _contactRepository = contactRepository;
        }

        public async Task<IEnumerable<Contact>> GetContacts()
        {
            return await _contactRepository.GetContactsAsync();
        }
        public async Task<Contact> GetContact(int id)
        {
            return await _contactRepository.GetContactAsync(id);
        }
        public async Task<Contact> AddContact(Contact contact)
        {
            if (contact == null)
            {
                throw new ArgumentException("Invalid contact data.");
            }
            await _contactRepository.AddContactAsync(contact);
            return contact;
        }

        public async Task<Contact> UpdateContact(Contact contact)
        {
            if (contact == null || contact.Id <= 0)
            {
                throw new ArgumentException("Invalid contact data.");
            }
            await _contactRepository.UpdateContactAsync(contact);
            return contact;
        }
        public async Task DeleteContact(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Invalid contact id.");
            }
            await _contactRepository.DeleteContactAsync(id);
        }

    }
}
