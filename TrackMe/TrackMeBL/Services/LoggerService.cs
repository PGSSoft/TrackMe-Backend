using System;
using System.IO;
using System.Web;

namespace TrackMeBL.Services
{
    public class LoggerService
    {
        public void Log(string message)
        {
            var root = HttpContext.Current.Server.MapPath("/");
            var dir = Path.Combine(root, "Logs", "ApplicationLogger");
            var fileName = $"log_{Guid.NewGuid()}.txt";
            var file = Path.Combine(dir, fileName);
            Directory.CreateDirectory(dir);
            File.WriteAllText(file, message);
        }
    }
}
