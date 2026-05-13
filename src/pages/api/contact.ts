import type { APIRoute } from 'astro';

// SUPABASE PLACEHOLDER
// Para activar el backend real:
// 1. Crea un proyecto en https://supabase.com
// 2. Crea la tabla: messages(id, name, email, message, created_at)
// 3. Añade las variables de entorno en .env:
//    PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
//    PUBLIC_SUPABASE_ANON_KEY=your-anon-key
// 4. Instala: npm install @supabase/supabase-js
// 5. Descomenta el bloque de Supabase abajo

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Campos requeridos incompletos.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email inválido.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    /* ── SUPABASE INTEGRATION (descomenta cuando tengas las credenciales) ──
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      import.meta.env.PUBLIC_SUPABASE_URL,
      import.meta.env.PUBLIC_SUPABASE_ANON_KEY
    );

    const { error } = await supabase
      .from('messages')
      .insert({ name, email, message });

    if (error) throw error;
    ── FIN SUPABASE ── */

    // Simulación de delay de red (SSH handshake feeling)
    await new Promise(resolve => setTimeout(resolve, 800));

    console.log(`[CONTACT] New message from ${name} <${email}>`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Paquete transmitido con éxito.',
        timestamp: new Date().toISOString(),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('[CONTACT ERROR]', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Error interno del servidor.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
