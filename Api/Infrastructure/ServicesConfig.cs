using Services.Services.Implementation;
using Services.Services.Interface;

namespace Api.Infrastructure
{
    public static class ServicesConfig
    {
        public static IServiceCollection AddServices(
            this IServiceCollection services)
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IReferenceDataService, ReferenceDataService>();
            return services;
        }
    }
}
