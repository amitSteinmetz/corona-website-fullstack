using corona_server_side_asp.net.Dto;

namespace corona_server_side_asp.net.IRepositories
{
    public interface IUsersRepository
    {
        Task<LoggedUserDto> Login(LoginDto userDto);
    }
}