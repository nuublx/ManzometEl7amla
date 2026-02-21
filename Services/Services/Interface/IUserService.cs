using Services.DTO;

namespace Services.Services.Interface
{
    public interface IUserService
    {
        public Task<UserDto> GetUserByIdAsync(int id, CancellationToken token);
        public Task<IEnumerable<UserDto>> GetUsersAsync(IEnumerable<int> ids, CancellationToken token);
        public Task<UserDto> CreateUserAsync(CreateUserDto createUserDto, CancellationToken token);
        public Task<UserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto, CancellationToken token);
        public Task DeleteUserAsync(int id, CancellationToken token);
    }
}
