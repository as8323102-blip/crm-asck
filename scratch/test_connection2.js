import pg from 'pg';

const poolers = [
  'aws-0-ap-southeast-2.pooler.supabase.com',
  'aws-0-ap-northeast-3.pooler.supabase.com',
  'aws-0-eu-south-1.pooler.supabase.com',
  'aws-0-eu-north-1.pooler.supabase.com',
  'aws-0-me-central-1.pooler.supabase.com',
  'aws-0-af-south-1.pooler.supabase.com'
];

async function test() {
  for (const host of poolers) {
    console.log(`Probando conexión con host pooler: ${host}...`);
    const client = new pg.Client({
      host: host,
      port: 6543,
      user: 'postgres.sjhmoyamcnfzugnqnpxv',
      password: 'Adair0830qwr',
      database: 'postgres',
      ssl: { rejectUnauthorized: false }
    });

    try {
      await client.connect();
      console.log(`¡CONECTADO CON ÉXITO A ${host}!`);
      const res = await client.query("SELECT VERSION();");
      console.log("Versión de PostgreSQL:", res.rows[0].version);
      await client.end();
      return host;
    } catch (err) {
      console.warn(`Fallo de conexión a ${host}:`, err.message);
    }
  }
  console.log("Prueba terminada.");
}

test();
