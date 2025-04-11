using System.ComponentModel.DataAnnotations;

namespace JobPositions.Middlewares
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleware> _logger;

        public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var message = ex.Message;
            var code = StatusCodes.Status500InternalServerError;
            switch (ex)
            {
                case ValidationException _:
                    code = StatusCodes.Status400BadRequest;
                    break;
                case KeyNotFoundException _:
                    code = StatusCodes.Status404NotFound;
                    break;
                default:
                    message = "An unexpected error occurred. Please try again later.";
                    break;
            }

            _logger.LogError(ex, "An unexpected error occurred.");
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = code;
            await context.Response.WriteAsJsonAsync(new { message = message });
        }
    }
}
