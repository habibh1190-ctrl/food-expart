/**
 * Cloudflare Pages Functions API Handler
 * Compatible with Cloudflare Workers runtime and D1 database
 */

interface EventContext {
  request: Request;
  env: {
    DB?: any;
    FOOD_EXPERT_KV?: any;
    ADMIN_SECRET?: string;
  };
  params: Record<string, string | string[]>;
}

export const onRequest = async (context: EventContext): Promise<Response> => {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Health check endpoint
  if (path === '/api/health') {
    return new Response(
      JSON.stringify({
        status: 'healthy',
        brand: 'Food Expert',
        timestamp: new Date().toISOString(),
        runtime: 'Cloudflare Pages Functions / Workers',
      }),
      { headers: corsHeaders }
    );
  }

  // Fallback for API routes
  return new Response(
    JSON.stringify({
      message: 'Food Expert Cloudflare API Active',
      path,
      method: request.method,
    }),
    { headers: corsHeaders }
  );
};
