namespace Services.Services.Implementation
{
    using DataContext.Context;
    using DataContext.Entities;
    using DTO;
    using global::Services.Helpers;
    using Interface;
    using Microsoft.EntityFrameworkCore;

    public class UserService(DatabaseContext _context) : IUserService
    {
        public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto, CancellationToken token)
        {
            var user = new User
            {
                Name = createUserDto.Name,
                PasswordHash = Hashing.HashPassword(createUserDto.Password)
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync(token);
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
            };
        }

        public async Task DeleteUserAsync(int id, CancellationToken token)
        {
            if (id < 0)
            {
                throw new ArgumentException("Id must be non-negative", nameof(id));
            }
            var user = await _context.Set<User>().FirstOrDefaultAsync(x => x.Id == id, token);
            if (user is not null)
            {
                _context.Set<User>().Remove(user);
                await _context.SaveChangesAsync(token);
            }
            else
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
        }

        public async Task<UserDto> GetUserByIdAsync(int id, CancellationToken token)
        {
            if (id < 0)
            {
                throw new ArgumentException("Id must be non-negative", nameof(id));
            }
            return await _context.Users
                .Where(x => x.Id == id)
                .Select(x => new UserDto
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .FirstOrDefaultAsync(token) ?? throw new KeyNotFoundException($"User with id {id} not found");
        }

        public async Task<IEnumerable<UserDto>> GetUsersAsync(IEnumerable<int>? ids, CancellationToken token)
        {
            var query = _context.Users.AsQueryable();
            if (ids is not null && ids.Any())
            {
                query = query.Where(x => ids.Contains(x.Id));
            }

            return await query
                .Select(x => new UserDto
                {
                    Id = x.Id,
                    Name = x.Name,
                })
                .ToListAsync(token);
        }

        public async Task<UserDto> UpdateUserAsync(int id, UpdateUserDto updateUserDto, CancellationToken token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id, token);
            if (user is null)
            {
                throw new KeyNotFoundException($"User with id {id} not found");
            }
            user.Name = updateUserDto.Name;
            user.PasswordHash = Hashing.HashPassword(updateUserDto.Password);
            await _context.SaveChangesAsync(token);

            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
            };
        }
    }
}
