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

        #region add-row

        [HttpPost("add-row/traffic-light-program/{sectionId}/{tableId}")]
        public async Task<IActionResult> AddTrafficRowToTable(int sectionId, int tableId, [FromBody] TrafficLightProgramItem row)
        {
            return await AddRowToTable(sectionId, tableId, row);
        }
        
        [HttpPost("add-row/incoming-persons/{sectionId}/{tableId}")]
        public async Task<IActionResult> AddIncomingPersonsRowToTable(int sectionId, int tableId, [FromBody] IncomingPersonsItem row)
        {
            return await AddRowToTable(sectionId, tableId, row);
        }

        [HttpPost("add-row/hospital-bed-occupancy/{sectionId}/{tableId}")]
        public async Task<IActionResult> AddHospitalBedOccupancyRowToTable(int sectionId, int tableId, [FromBody] HospitalBedOccupancyItem row)
        {
            return await AddRowToTable(sectionId, tableId, row);
        }

        private async Task<IActionResult> AddRowToTable<T>(int sectionId, int tableId, T row)
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

        #endregion

        #region edit-row

        [HttpPut("update-row/traffic-light-program/{sectionId}/{tableId}/{rowId}")]
        public async Task<IActionResult> EditTrafficLightProgramRow(int sectionId, int tableId, int rowId, [FromBody] TrafficLightProgramItem row)
        {
            return await EditRow(sectionId, tableId, rowId, row);
        }

        [HttpPut("update-row/incoming-persons/{sectionId}/{tableId}/{rowId}")]
        public async Task<IActionResult> EditIncomingPersonsRow(int sectionId, int tableId, int rowId, [FromBody] IncomingPersonsItem row)
        {
            return await EditRow(sectionId, tableId, rowId, row);
        }

        [HttpPut("update-row/hospital-bed-occupancy/{sectionId}/{tableId}/{rowId}")]
        public async Task<IActionResult> EditHospitalBedOccupancyRow(int sectionId, int tableId, int rowId, [FromBody] HospitalBedOccupancyItem row)
        {
            return await EditRow(sectionId, tableId, rowId, row);
        }

        private async Task<IActionResult> EditRow<T>(int sectionId, int tableId, int rowId, T row)
        {
            if (row == null) return BadRequest("Row data is required.");
            try
            {
                await _tablesRepository.EditRow(sectionId, tableId, rowId, row);
                return Ok(new
                {
                    SectionId = sectionId,
                    TableId = tableId,
                    RowId = rowId,
                    UpdatedRow = row
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

        #endregion
    }
}
