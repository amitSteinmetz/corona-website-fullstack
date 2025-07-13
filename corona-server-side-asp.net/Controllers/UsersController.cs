using corona_server_side_asp.net.Dto;
using corona_server_side_asp.net.IRepositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace corona_server_side_asp.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;

        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto userDto)
        {
            var loggedUser = await _usersRepository.Login(userDto);
            if (loggedUser == null) return Unauthorized("Invalid email or password");
            return Ok(loggedUser);
        }
    }
}
