using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;

using DataContext.Context;
using DataContext.Entities;

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using Services.DTO;
using Services.Helpers;
using Services.Services.Interface;

namespace Services.Services.Implementation
{
    public class AuthService(DatabaseContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<AuthResponseDto> RegisterAsync(CreateUserDto createUserDto, CancellationToken token)
        {
            var user = new User
            {
                Name = createUserDto.Name,
                PasswordHash = Hashing.HashPassword(createUserDto.Password)
            };

            context.Users.Add(user);

            try
            {
                await context.SaveChangesAsync(token);
            }
            catch (DbUpdateException ex) when (IsUniqueNameConstraintViolation(ex))
            {
                throw new InvalidOperationException("A user with this name already exists.");
            }

            return BuildAuthResponse(user);
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto, CancellationToken token)
        {
            var user = await context.Users
                .Where(x => x.Id == loginDto.Id)
                .FirstOrDefaultAsync(token) ?? throw new UnauthorizedAccessException("Invalid credentials.");

            var isValid = Hashing.VerifyPassword(loginDto.Password, user.PasswordHash);
            if (!isValid)
            {
                throw new UnauthorizedAccessException("Invalid credentials.");
            }

            return BuildAuthResponse(user);
        }

        private static bool IsUniqueNameConstraintViolation(DbUpdateException exception)
        {
            if (exception.InnerException is not SqlException sqlException)
            {
                return false;
            }

            return sqlException.Number is 2601 or 2627;
        }

        private AuthResponseDto BuildAuthResponse(User user)
        {
            var jwtKey = configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("JWT signing key is not configured.");
            var issuer = configuration["Jwt:Issuer"]
                ?? throw new InvalidOperationException("JWT issuer is not configured.");
            var audience = configuration["Jwt:Audience"]
                ?? throw new InvalidOperationException("JWT audience is not configured.");
            var expirationMinutes = int.TryParse(configuration["Jwt:ExpirationMinutes"], out var minutes)
                ? minutes
                : 1500;
            
            var claims =
                new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Name)
                };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
                signingCredentials: credentials);

            return new AuthResponseDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                User = new UserDto
                {
                    Id = user.Id,
                    Name = user.Name
                }
            };
        }
    }
}
