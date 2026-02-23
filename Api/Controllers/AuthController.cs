using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services.DTO;
using Services.Services.Interface;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDto>> Register(CreateUserDto createUserDto, CancellationToken token)
        {
            try
            {
                var response = await authService.RegisterAsync(createUserDto, token);
                
                var cookieOptions = new CookieOptions
                {
                    SameSite = SameSiteMode.Strict,
                    Expires = DateTime.UtcNow.AddDays(7)
                };

                Response.Cookies.Append("jwt", response.Token, cookieOptions);

                return Ok(response);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginDto loginDto, CancellationToken token)
        {
            try
            {
                var response = await authService.LoginAsync(loginDto, token);
                var cookieOptions = new CookieOptions
                {
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7)
                };

                Response.Cookies.Append("jwt", response.Token, cookieOptions);
                return Ok(response);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(new { message = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
        }

        [Authorize]
        [HttpGet("check-auth")]
        public async Task<ActionResult<UserDto>> CheckAuth()
        {
            var user = new UserDto
            {
                Id = int.Parse(User.FindFirst("id")?.Value ?? "0"),
                Name = User.Identity?.Name ?? string.Empty
            };
            return Ok(user);
        }
        //[HttpPost("forget-password")]
        //public async Task<ActionResult> ForgetPassword(string Name, CancellationToken token)
        //{
        //    // Implement password reset logic here
        //    return Ok(new { message = "Password reset link has been sent to your email." });
        //}
    }
}
