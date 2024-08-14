﻿using BookStore.Domain.Entitess;
using BookStore.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Infrastructure.Repositories
{
    public class BookRepository
    {
        private readonly ApplicationDbContext _context;

        public BookRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooksAsync()
        {
            List<Book> books = await _context.Books.ToListAsync();
            return books;
        }
        public async Task AddBookAsync(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> UpdateBookAsync(Book book)
        {
            try
            {
                var entity = await _context.Books.FindAsync(book.Id);

                if (entity == null)
                {
                    return false;
                }

                // Güncelleme işlemleri
                entity.Title = book.Title;
                entity.Author = book.Author;
                entity.PublishedDate = book.PublishedDate;

                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                // Hata yönetimi
                // Loglama veya kullanıcıya hata bilgisi verme işlemleri yapılabilir
                return false;
            }
        }
        public async Task<bool> DeleteBookAsync(int id)
        {
            var entity = await _context.Books.FindAsync(id);
            if (entity == null)
            {
                return false;
            }
            _context.Books.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }


    }
}
