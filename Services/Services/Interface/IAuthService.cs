using Services.DTO;

namespace Services.Services.Interface
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(CreateUserDto createUserDto, CancellationToken token);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto, CancellationToken token);
    }
}
