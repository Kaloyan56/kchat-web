using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System.Diagnostics.Eventing.Reader;
using WebApplication1.Pages;
using static WebApplication1.Pages.Client;

namespace WebApplication1.Hubs
{
    public class ChatHub : Hub
    {
        private string usern = Client.usernameT;
        static Dictionary<string,string> ids = new Dictionary<string, string>();

        
        public async Task SendMessage(string message, string id)
        {
            if (message == null || message == "")
            {
                message = " ";
            }
            string user = ids[id];
            int length = user.Length;
            await Clients.All.SendAsync("ReceiveMessage", message, user, id, length);
        }
        public override async Task OnConnectedAsync()
        {
            string id = Context.ConnectionId;
            ids.Add(id, usern);
            await Clients.All.SendAsync("ClientConn", usern, id);
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            string usr = ids[Context.ConnectionId];
            ids.Remove(Context.ConnectionId);
            await Clients.All.SendAsync("ClientDisc", usr);
        }
    }
}