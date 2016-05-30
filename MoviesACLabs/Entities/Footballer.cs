﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace MoviesACLabs.Entities
{
    public class Footballer
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Age { get; set; }

        public int Goals { get; set; }

    }
}