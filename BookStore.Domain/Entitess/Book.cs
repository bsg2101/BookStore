using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookStore.Domain.Entitess
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(50)]
        public string Author { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public DateOnly PublishedDate { get; set; }
        [Required]
        public string ImgUrl { get; set; }


    }
}
