namespace Medico.WebAPI.Models
{
    public class ChangePasswordRequest
    {
        public int UserId { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public int? attempt { get; set; }
    }
}
