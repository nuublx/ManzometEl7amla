using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Services.Interface;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CampaignTypesController(IReferenceDataService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NamedEntityDto>>> GetAll(CancellationToken token) => Ok(await service.GetCampaignTypesAsync(token));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<NamedEntityDto>> GetById(int id, CancellationToken token)
        {
            try { return Ok(await service.GetCampaignTypeByIdAsync(id, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpPost]
        public async Task<ActionResult<NamedEntityDto>> Create(CreateNamedEntityDto dto, CancellationToken token)
        {
            var created = await service.CreateCampaignTypeAsync(dto, token);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<NamedEntityDto>> Update(int id, UpdateNamedEntityDto dto, CancellationToken token)
        {
            try { return Ok(await service.UpdateCampaignTypeAsync(id, dto, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            try { await service.DeleteCampaignTypeAsync(id, token); return NoContent(); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }
    }
}
