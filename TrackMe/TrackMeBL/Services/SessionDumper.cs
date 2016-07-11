using System;
using System.Globalization;
using System.IO;
using System.Text;
using System.Web;
using TrackMeBL.Infrastructure;
using TrackMeBL.Model;

namespace TrackMeBL.Services
{
    public class SessionDumper
    {
        public OperationResult LogSession(string token, NavigationItem item)
        {
            if (!item.Expired.HasValue)
            {
                return OperationResult.Failure("Session has to be expired");
            }
            var date = DateTime.Now;
            string root = HttpContext.Current.Server.MapPath("/");
            string dir = Path.Combine(root, "Logs", "SessionDump");
            Directory.CreateDirectory(dir);
            string fileName = $"session_dump_{date.Year}_{date.Month}_{date.Day}.csv";
            string path = Path.Combine(dir, fileName);
            var sb = new StringBuilder();
            if (!File.Exists(path))
            {
                sb.AppendLine("session_number,start_date,stop_date,duration,latitude,longitude");
                File.AppendAllText(path, sb.ToString());
                sb.Clear();
            }
            var duration = item.Expired.Value - item.StartTime;
            sb.AppendLine(
                $"{token},{item.StartTime.ToString("yyyy-MM-dd HH:mm:ss")},{item.Expired.Value.ToString("yyyy-MM-dd HH:mm:ss")},{duration.ToString("g", CultureInfo.InvariantCulture)},{item.Latitude.ToString(CultureInfo.InvariantCulture)},{item.Longitude.ToString(CultureInfo.InvariantCulture)}");
            File.AppendAllText(path, sb.ToString());
            return OperationResult.Success();
        }
    }
}