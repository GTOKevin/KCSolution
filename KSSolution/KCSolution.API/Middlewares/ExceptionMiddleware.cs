using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Text.Json;
using FluentValidation; 

namespace KCSolution.API.Middlewares
{
    public sealed class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        public ExceptionMiddleware(RequestDelegate next) => _next = next;

        public async Task InvokeAsync(HttpContext ctx)
        {
            try
            {
                await _next(ctx);
            }
            catch (Exception ex)
            {
                await HandleAsync(ctx, ex);
            }
        }

        private static async Task HandleAsync(HttpContext ctx, Exception ex)
        {
            ctx.Response.ContentType = "application/json";
            ctx.Response.Headers["Cache-Control"] = "no-store";

            int status;
            object payload;

            switch (ex)
            {
                case FluentValidation.ValidationException vEx:
                    status = (int)HttpStatusCode.BadRequest;
                    var errorList = vEx.Errors?.ToList()
                        ?? (vEx is { InnerException: FluentValidation.ValidationException inner }
                            ? inner.Errors.ToList()
                            : new List<FluentValidation.Results.ValidationFailure>());

                    payload = new
                    {
                        title = "Validation failed",
                        status,
                        errors = errorList
                            .GroupBy(e => e.PropertyName)
                            .ToDictionary(
                                g => g.Key,
                                g => g.Select(e => e.ErrorMessage).Distinct().ToArray()
                            )
                    };
                    break; 

                case KeyNotFoundException:
                    status = (int)HttpStatusCode.NotFound;
                    payload = new { title = "Resource not found", status, detail = ex.Message };
                    break;

                case InvalidOperationException:
                    status = (int)HttpStatusCode.Conflict;
                    payload = new { title = "Invalid operation", status, detail = ex.Message };
                    break;

                case ArgumentException:
                    status = (int)HttpStatusCode.BadRequest;
                    payload = new { title = "Bad request", status, detail = ex.Message };
                    break;

                case DbUpdateException dbEx:
                    status = (int)HttpStatusCode.Conflict;
                    payload = new { title = "Database update error", status, detail = dbEx.InnerException?.Message ?? dbEx.Message };
                    break;

                default:
                    status = (int)HttpStatusCode.InternalServerError;
                    payload = new { title = "Internal server error", status, detail = ex.Message };
                    break;
            }

            ctx.Response.StatusCode = status;
            var json = JsonSerializer.Serialize(payload, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase });
            await ctx.Response.WriteAsync(json);
        }
    }

    public static class ExceptionMiddlewareExtensions
    {
        public static IApplicationBuilder UseApiExceptionHandling(this IApplicationBuilder app)
            => app.UseMiddleware<ExceptionMiddleware>();
    }
}
