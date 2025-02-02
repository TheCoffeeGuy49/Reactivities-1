
using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return Ok(); //await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            //return (IActionResult)await Mediator.Send(new Details.Query{Id = id});

            var result = await Mediator.Send(new Details.Query{Id = id});

            if(result.IsSuccess && result.Value != null)
            return Ok(result.Value);
            if(result.IsSuccess && result.Value == null)
            return NotFound();
            return BadRequest(result.Error);

        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return Ok();//await Mediator.Send(new Create.Command { Activity = activity }));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Edit(Guid id, Activity activity)
        {
            activity.Id = id;
            return Ok();//await Mediator.Send(new Edit.Command { Activity = activity })));
        }
        
        // [HttpDelete("{id}")]
        // {

        // }
    }
}