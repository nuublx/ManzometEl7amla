using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Services.Interface;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignThingsController(IReferenceDataService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CampaignThingDto>>> GetAll(CancellationToken token) => Ok(await service.GetCampaignThingsAsync(token));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<CampaignThingDto>> GetById(int id, CancellationToken token)
        {
            try { return Ok(await service.GetCampaignThingByIdAsync(id, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpPost]
        public async Task<ActionResult<CampaignThingDto>> Create(CreateCampaignThingDto dto, CancellationToken token)
        {
            var created = await service.CreateCampaignThingAsync(dto, token);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<CampaignThingDto>> Update(int id, UpdateCampaignThingDto dto, CancellationToken token)
        {
            try { return Ok(await service.UpdateCampaignThingAsync(id, dto, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            try { await service.DeleteCampaignThingAsync(id, token); return NoContent(); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }
    }
}
