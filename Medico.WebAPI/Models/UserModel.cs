namespace Medico.WebAPI.Models
{
    public class UserModel
    {
        public int userid { get; set; }
        public string username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string FullName { get; set; }
        public bool isFirstLogin { get; set; }
        public string Token { get; set; }

        public string email { get; set; }
    }
}
