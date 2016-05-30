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
    public class TeamsController : ApiController
    {
        private MoviesContext db = new MoviesContext();

        // GET: api/Teams
        public IList<TeamModel> GetTeams()
        {
            var teams = db.Teams.Include(m => m.Players);

            var teamsModel = Mapper.Map<IList<TeamModel>>(teams);

            return teamsModel;
        }

        // GET: api/Teams
        [Route("teamvowels/")]
        public List<TeamModel> GetTeamsWithTwoVowels()
        {
            var teams = db.Teams.Include(m => m.Players);
            var vowels = new HashSet<char> { 'a', 'e', 'i', 'o', 'u' };
            //var mapper = Mapper.CreateMap<Team, TeamModel>().ForMember(dest => dest.Name, opt => opt.Condition(src => (src.Name.Count(c => vowels.Contains(c)) == 2));
            //var mapper = Mapper.CreateMap<TeamModel, Team>().ForMember(dest => dest.Name, opt => opt.Condition(src => (src.Name.Count(c => vowels.Contains(c)) == 2));
            //var mapper = new Mapper(cfg => cfg.CreateMap<Source, Dest>());
            var teamsModel = Mapper.Map<IList<TeamModel>>(teams);
            var teamsModelFinal = teamsModel.Where(i => i.Name.ToLower().Count(c => vowels.Contains(c)) == 2).ToList();
           
            return teamsModelFinal;
        }

        // GET: api/teams/5
        [ResponseType(typeof(TeamModel))]
        public IHttpActionResult GetTeam(int id)
        {
            Team movie = db.Teams.Find(id);
            if (movie == null)
            {
                return NotFound();
            }

            var movieModel = Mapper.Map<TeamModel>(movie);

            return Ok(movieModel);
        }

        // PUT: api/teams/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeam(int id, TeamModel movieModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != movieModel.Id)
            {
                return BadRequest();
            }

            var movie = Mapper.Map<Team>(movieModel);

            db.Entry(movie).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeamExists(id))
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

        // POST: api/teams
        [ResponseType(typeof(TeamModel))]
        public IHttpActionResult PostTeam(TeamModel movieModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var movie = Mapper.Map<Team>(movieModel);

            db.Teams.Add(movie);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = movie.Id }, movie);
        }

        // DELETE: api/teams/5
        public IHttpActionResult DeleteTeam(int id)
        {
            Team movie = db.Teams.Find(id);
            if (movie == null)
            {
                return NotFound();
            }

            db.Teams.Remove(movie);
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

        private bool TeamExists(int id)
        {
            return db.Teams.Any(e => e.Id == id);
        }
    }
}