using System;
using System.Diagnostics;

/// <summary>
/// Simple program used to kill trash instances of Node.js 
/// created by testing process of Corde.
/// </summary>

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

Console.WriteLine("Processeses killed with success.");
