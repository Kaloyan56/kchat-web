namespace WebApplication1.Pages
{
    public static class Client
    {
        public static string usernameT { get; set; }
        public static string ConnectionID { get; set; }

        static Client() { }
        public static void setName(string uname)
        {
            usernameT = uname;
        }
    }
}
