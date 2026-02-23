using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Services.Interface;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VehiclesController(IReferenceDataService service) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VehicleDto>>> GetAll(CancellationToken token) => Ok(await service.GetVehiclesAsync(token));

        [HttpGet("{id:int}")]
        public async Task<ActionResult<VehicleDto>> GetById(int id, CancellationToken token)
        {
            try { return Ok(await service.GetVehicleByIdAsync(id, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpPost]
        public async Task<ActionResult<VehicleDto>> Create(CreateVehicleDto dto, CancellationToken token)
        {
            var created = await service.CreateVehicleAsync(dto, token);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<VehicleDto>> Update(int id, UpdateVehicleDto dto, CancellationToken token)
        {
            try { return Ok(await service.UpdateVehicleAsync(id, dto, token)); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id, CancellationToken token)
        {
            try { await service.DeleteVehicleAsync(id, token); return NoContent(); }
            catch (KeyNotFoundException ex) { return NotFound(new { message = ex.Message }); }
        }
    }
}
