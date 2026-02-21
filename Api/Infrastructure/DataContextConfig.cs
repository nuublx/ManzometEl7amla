using DataContext.Context;
using Microsoft.EntityFrameworkCore;

namespace Api.Infrastructure
{
    public static class DataContextConfig
    {
        public static IServiceCollection AddDataContext(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(
                    configuration.GetConnectionString("DefaultConnection")));

            return services;
        }
    }
}
