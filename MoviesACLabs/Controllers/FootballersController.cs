using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MoviesACLabs.Data;
using MoviesACLabs.Models;
using AutoMapper;
using MoviesACLabs.Entities;

namespace MoviesACLabs.Controllers
{
    public class FootballersController : ApiController
    {
        private MoviesContext db = new MoviesContext();

        // GET: api/Footballers
        public IList<FootballerModel> GetFootballers()
        {
            var footballers= db.Footballers;
            var footballersModel = Mapper.Map<IList<FootballerModel>>(footballers);
            return footballersModel;
        }

        // GET: api/Footballers/5
        [ResponseType(typeof(ActorModel))]
        public IHttpActionResult GetFootballer(int id)
        {
            Footballer footballer = db.Footballers.Find(id);
            if (footballer == null)
            {
                return NotFound();
            }

            var footballerModel = Mapper.Map<FootballerModel>(footballer);

            return Ok(footballerModel);
        }

        // PUT: api/Footballers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFootballer(int id, FootballerModel footballerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != footballerModel.Id)
            {
                return BadRequest();
            }

            var actor = Mapper.Map<Footballer>(footballerModel);

            db.Entry(actor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FootballerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Footballers
        [ResponseType(typeof(FootballerModel))]
        public IHttpActionResult PostFootballer(FootballerModel footballerModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var footballer = Mapper.Map<Footballer>(footballerModel);

            db.Footballers.Add(footballer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = footballer.Id }, footballer);
        }

        // DELETE: api/Footballers/5
        public IHttpActionResult DeleteFootballer(int id)
        {
            Footballer footballer = db.Footballers.Find(id);
            if (footballer == null)
            {
                return NotFound();
            }

            db.Footballers.Remove(footballer);
            db.SaveChanges();

            return Ok();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FootballerExists(int id)
        {
            return db.Footballers.Any(e => e.Id == id);
        }
    }
}