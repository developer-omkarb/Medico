using System;
using Azure.Identity;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Medico.WebAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.WriteLine("Omkar is starting build");
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, config) =>
                {
                    var builtConfig = config.Build();
                    var keyVaultUri = builtConfig["KeyVault:VaultUri"];

                    if (!string.IsNullOrWhiteSpace(keyVaultUri))
                    {
                        try
                        {
                            config.AddAzureKeyVault(
                                new Uri(keyVaultUri),
                                new DefaultAzureCredential()
                            );
                        }
                        catch (Exception ex)
                        {
                            // Do not let Key Vault failures prevent the app from starting in Azure
                            // Write to console so App Service and other hosts can capture the error
                            Console.WriteLine($"Warning: Failed to load configuration from Azure Key Vault ({keyVaultUri}). Exception: {ex}");
                        }
                    }
                })
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
