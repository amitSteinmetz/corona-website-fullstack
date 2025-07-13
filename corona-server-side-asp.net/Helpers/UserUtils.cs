using corona_server_side_asp.net.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace corona_server_side_asp.net.Helpers
{
    public class UserUtils
    {
        public static async Task SeedAdminUser(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

            var roleExists = await roleManager.RoleExistsAsync("Admin");
            if (!roleExists) await roleManager.CreateAsync(new IdentityRole("Admin"));

            var adminUser = await userManager.FindByEmailAsync("admin@corona.com");
            if (adminUser == null)
            {
                adminUser = new IdentityUser
                {
                    UserName = "admin@corona.com",
                    Email = "admin@corona.com"
                };

                var result = await userManager.CreateAsync(adminUser, "Admin123!");

                if (result.Succeeded) await userManager.AddToRoleAsync(adminUser, "Admin");
                else
                {
                    var errors = string.Join(", ", result.Errors.Select(result => result.Description));
                    throw new Exception($"Failed to create admin user: {errors}");
                }
            }
        }

        public static async Task<string> GenerateToken(UserManager<IdentityUser> userManager, IdentityUser user, IConfiguration config)
        {
            var roles = await userManager.GetRolesAsync(user);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email)
            };
            foreach (var role in roles) claims.Add(new Claim(ClaimTypes.Role, role));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: config["Jwt:Issuer"],
                audience: config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
