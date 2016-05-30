using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MoviesACLabs.Entities
{
    public class Team
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Country { get; set; }

        public virtual IList<Footballer> Players { get; set; }
    }
}