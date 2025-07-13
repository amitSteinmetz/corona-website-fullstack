using corona_server_side_asp.net.Dto;
using corona_server_side_asp.net.Helpers;
using corona_server_side_asp.net.IRepositories;
using Microsoft.AspNetCore.Identity;
using OfficeOpenXml.FormulaParsing.LexicalAnalysis;
using System.IdentityModel.Tokens.Jwt;

namespace corona_server_side_asp.net.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _config;

        public UsersRepository(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration config)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

        public async Task<LoggedUserDto> Login(LoginDto userDto)
        {
            var user = await _userManager.FindByEmailAsync(userDto.Email);
            if (user == null) return null;

            var result = await _signInManager.PasswordSignInAsync(user, userDto.Password, false, false);
            if (!result.Succeeded) return null;

            var jwtToken = await UserUtils.GenerateToken(_userManager, user, _config);

            return new LoggedUserDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                ExpireTime = jwtToken.ValidTo
            };
        }
    }
}
