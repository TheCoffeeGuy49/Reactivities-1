using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Shift + Alt + F: format code!
    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        // "??=" is used to question if the _mediator us null:
        protected IMediator Mediator => _mediator ??=
            HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result)  
        {
            if(result.IsSuccess && result.Value != null)
                return Ok(result.Value);
            if(result.IsSuccess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);  
        }  
    }
}