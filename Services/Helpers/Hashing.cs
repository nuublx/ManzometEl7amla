
namespace Services.Helpers
{
    using BC = BCrypt.Net;
    public class Hashing
    {
        public static string HashPassword(string password)
        {
            return BC.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string password, string hash)
        {
            return BC.BCrypt.Verify(password, hash);
        }
    }
}
