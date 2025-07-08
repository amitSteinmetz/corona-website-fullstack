using corona_server_side_asp.net.IRepositories;
using corona_server_side_asp.net.Models.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ITablesRepository _tablesRepository;

        public TablesController(ITablesRepository tablesRepository)
        {
            _tablesRepository = tablesRepository;
        }

        [HttpPost("{sectionId}")]
        public async Task<IActionResult> AddTableToSection(int sectionId, [FromBody] TableModel table)
        {
            if (table == null) return BadRequest("Table data is required.");

            try
            {
                var result = await _tablesRepository.AddTableToSection(sectionId, table);
                return Ok(new { Message = "Table added successfully", RowsAffected = result });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet("{sectionId}/{tableId}")]
        public async Task<IActionResult> GetTable(int sectionId, int tableId)
        {
            try
            {
                var table = await _tablesRepository.GetTable(sectionId, tableId);
                return Ok(table);
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{sectionId}/{tableId}")]
        public async Task<IActionResult> DeleteTable(int sectionId, int tableId)
        {
            try
            {
                var result = await _tablesRepository.DeleteTable(sectionId, tableId);
                return Ok(new { Message = "Table deleted successfully", RowsAffected = result });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("delete-row/{sectionId}/{tableId}/{rowId}")]
        public async Task<IActionResult> DeleteRowFromTable(int sectionId, int tableId, int rowId)
        {
            try
            {
                await _tablesRepository.DeleteRowFromTable(sectionId, tableId, rowId);
                return Ok(new
                {
                    SectionId = sectionId,
                    TableId = tableId,
                    RowId = rowId
                });
            }
            catch (ArgumentException ex)
            {
                Console.WriteLine($"Error retrieving table: {ex.Message}");

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost("add-row/{sectionId}/{tableId}")]
        public async Task<IActionResult> AddTrafficRowToTable(int sectionId, int tableId, [FromBody] TrafficLightProgramItem row)
        {
            if (row == null) return BadRequest("Row data is required.");

            try
            {
                await _tablesRepository.AddRowToTable(sectionId, tableId, row);
                return Ok(new
                {
                    SectionId = sectionId,
                    TableId = tableId,
                    Row = row
                });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<IActionResult> AddIncomingRowToTable(int sectionId, int tableId, [FromBody] IncomingPersonsItem row)
        {
            if (row == null) return BadRequest("Row data is required.");
            try
            {
                await _tablesRepository.AddRowToTable(sectionId, tableId, row);
                return Ok(new
                {
                    SectionId = sectionId,
                    TableId = tableId,
                    Row = row
                });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        public async Task<IActionResult> AddHospitalRowToTable(int sectionId, int tableId, [FromBody] HospitalBedOccupancyItem row)
        {
            if (row == null) return BadRequest("Row data is required.");
            try
            {
                await _tablesRepository.AddRowToTable(sectionId, tableId, row);
                return Ok(new
                {
                    SectionId = sectionId,
                    TableId = tableId,
                    Row = row
                });
            }
            catch (ArgumentException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
