using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public static class Common
    {
        /// <summary>
        /// paramter str format ex 01-05-2012
        /// </summary>
        /// <param name="dateStr"></param>
        /// <returns></returns>
        public static DateTime GetDate(string dateStr)
        {
            return DateTime.ParseExact(dateStr.Replace('-', '/'), "dd/MM/yyyy", null);
        }
        public static string RandomString(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            using (RNGCryptoServiceProvider rnd = new RNGCryptoServiceProvider())
            {
                while (length-- > 0)
                {
                    res.Append(valid[GetInt(rnd, valid.Length)]);
                }
            }
            return res.ToString();
        }
        private static int GetInt(RNGCryptoServiceProvider rnd, int max)
        {
            byte[] r = new byte[4];
            int value;
            do
            {
                rnd.GetBytes(r);
                value = BitConverter.ToInt32(r, 0) & Int32.MaxValue;
            } while (value >= max * (Int32.MaxValue / max));
            return value % max;
        }
    }
}
