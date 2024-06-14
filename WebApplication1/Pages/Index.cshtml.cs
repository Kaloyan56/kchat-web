using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Components.RenderTree;
using Microsoft.AspNetCore.Hosting.Server;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using Microsoft.JSInterop;
using System.Xml.Linq;
using static System.Runtime.InteropServices.JavaScript.JSType;
using static WebApplication1.Pages.Client;

namespace WebApplication1.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;
        public string usernameT { get; set; }
        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }
        //public IndexModel(IClient client) { 
        //_client = client;
        //}
        public void OnGet()
        {


        }

        public void bttn_Click(object sender, EventArgs e)
        {
            
        }
        
        
        public IActionResult OnPost() {

           
            if (ModelState.IsValid)
            {
                usernameT = Request.Form["usernameT"];
                Client.setName(usernameT);
                return RedirectToPage("chats");
            }
            return Page();
        }

    }
}
