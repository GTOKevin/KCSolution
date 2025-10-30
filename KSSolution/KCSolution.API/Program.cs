using FluentValidation;
using KCSolution.API.Middlewares;
using KCSolution.Application.Behaviors;
using KCSolution.Application.Features.Clientes.Commands;
using KCSolution.Application.Features.Pedidos.Commands;
using KCSolution.Application.Features.Productos.Commands;
using KCSolution.Application.Validators;
using KCSolution.Application.Validators.KCSolution.Application.Validators;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<KCSolution.Infrastructure.Context.ContextDB>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"), 
        b => b.MigrationsAssembly("KCSolution.Infrastructure")));

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

builder.Services.AddMediatR(cfg =>
    cfg.RegisterServicesFromAssemblies(
        typeof(CreateClienteCommand).Assembly,
        typeof(DeleteClienteCommand).Assembly,
        typeof(UpdateClienteCommand).Assembly,
        typeof(CreateProductoCommand).Assembly,
        typeof(DeleteProductoCommand).Assembly,
        typeof(UpdateProductoCommand).Assembly,
        typeof(CreatePedidoCommand).Assembly,
        typeof(DeletePedidoCommand).Assembly,
        typeof(UpdatePedidoCommand).Assembly)); 

builder.Services.AddValidatorsFromAssemblies(new[]
{
    typeof(CreateClienteCommandValidator).Assembly, 
    typeof(UpdateClienteCommandValidator).Assembly,
    typeof(CreateProductoCommandValidator).Assembly,
    typeof(UpdateProductoCommandValidator).Assembly,
    typeof(CreatePedidoCommandValidator).Assembly,
});

// Registro de pipeline de MediatR
builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));


// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001",
                "http://127.0.0.1:3000",
                "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Habilitar CORS
app.UseCors("AllowFrontend");

app.UseAuthorization();
app.UseApiExceptionHandling();

app.MapControllers();

app.Run();
