using System;
using System.Diagnostics;

namespace KillNodeProcess
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Seaching for Node.js Processes...");
            var processes = Process.GetProcessesByName("Node");

            if (processes != null)
            {
                Console.Write(" found " + processes.Length + " process \n");

                if (processes.Length == 0)
                {
                    Console.WriteLine("Nothing to kill. Closing");
                    return;
                }

                foreach (var process in processes)
                {
                    try
                    {
                        Console.Write("Killing: " + process.Id);
                        process.Kill();
                        Console.Write(" Done \n");
                    }
                    catch (Exception ex)
                    {
                        Console.Write(" Fail. " + ex.Message + "\n");
                    }
                }
            }

            Console.WriteLine("Process killed with success");
        }
    }
}
