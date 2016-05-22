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
    public class AwardsController : ApiController
    {

        private MoviesContext db = new MoviesContext();

        public IList<AwardModel> GetAwards()
        {
            var awards = db.Awards;
            var awardsModel = Mapper.Map<IList<AwardModel>>(awards);
            return awardsModel;
        }

        // GET: api/Awards/5
        [ResponseType(typeof(AwardModel))]
        [Route("myaward/{id:int}")]
        public IHttpActionResult GetAward(int id)
        {
            Award award = db.Awards.Find(id);
            if (award == null)
            {
                return NotFound();
            }

            var awardModel = Mapper.Map<AwardModel>(award);

            return Ok(awardModel);
        }

        // GET: api/Awards/5
        [ResponseType(typeof(AwardModel))]
        [Route("searchaward/{name}")]
        public IList<AwardModel> GetAwardsByName(string name)
        {
            var awards = db.Awards;
            var awardsModel = Mapper.Map<IList<AwardModel>>(awards).Where(award => award.Name.Equals(name)).ToList();

            return awardsModel;
        }

        // PUT: api/Awards/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAward(int id, AwardModel awardModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != awardModel.Id)
            {
                return BadRequest();
            }

            var award = Mapper.Map<Award>(awardModel);

            db.Entry(award).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AwardExists(id))
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

        // POST: api/Awards
        [ResponseType(typeof(AwardModel))]
        public IHttpActionResult PostAward(AwardModel awardModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var award = Mapper.Map<Award>(awardModel);

            db.Awards.Add(award);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = award.Id }, award);
        }

        // DELETE: api/Awards/5
        public IHttpActionResult DeleteAward(int id)
        {
            Award award = db.Awards.Find(id);
            if (award == null)
            {
                return NotFound();
            }

            db.Awards.Remove(award);
            db.SaveChanges();

            return Ok();
        }

        private bool AwardExists(int id)
        {
            return db.Awards.Any(e => e.Id == id);
        }
    }
}
