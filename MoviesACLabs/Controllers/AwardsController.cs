using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using MoviesACLabs.Data;
using MoviesACLabs.Models;
using MoviesACLabs.Entities;
using System.Web.Http;

namespace MoviesACLabs.Controllers
{
    public class AwardsController : ApiController
    {

        static List<AwardModel> awardList = new List<AwardModel>();
        static int awardCount = 0;

        public List<AwardModel> GetAwards()
        {
            return awardList;
        }

        [Route("myaward/{id:int}")]
        public IHttpActionResult GetAward(int id)
        {
            return Ok(awardList.Find(i => i.Id == id));
        }

        public IHttpActionResult PutAward(int id, AwardModel awardModel)
        {
            if(id != awardModel.Id)
            {
                return BadRequest();
            }
            int index = awardList.FindIndex(i => i.Id == id);
            if(index == -1)
            {
                return NotFound();
            }
            awardList[index] = awardModel;
            return Ok();
        }
        public IHttpActionResult PostAward(AwardModel awardModel)
        {
            awardCount++;
            awardModel.Id = awardCount;
            awardList.Add(awardModel);
            return Ok();
        }

        public IHttpActionResult DeleteAward(int id)
        {
            int index = awardList.FindIndex(i => i.Id == id);
            if (index == -1)
            {
                return NotFound();
            }
            awardList.RemoveAt(index);
            awardCount--;
            return Ok();
        }
    }
}
