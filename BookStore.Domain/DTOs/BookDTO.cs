using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Domain.DTOs
{
    public class BookDTO
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(50)]
        public string Author { get; set; }
        [Required]
        public DateTime PublishedDate { get; set; }


    }
}
