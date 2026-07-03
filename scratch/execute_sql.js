import pg from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = "postgresql://postgres:Adair0830qwr@db.sjhmoyamcnfzugnqnpxv.supabase.co:5432/postgres";
const sqlPath = path.resolve('../src/services/supabase/schema.sql');

async function run() {
  console.log("Conectando a la base de datos de Supabase...");
  const client = new pg.Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false } // Supabase requiere SSL
  });

  try {
    await client.connect();
    console.log("Conectado con éxito!");

    console.log("Leyendo archivo schema.sql...");
    const sql = fs.readFileSync(sqlPath, 'utf8');

    console.log("Ejecutando consultas...");
    await client.query(sql);
    console.log("¡Esquema SQL ejecutado exitosamente en Supabase!");
  } catch (err) {
    console.error("Error al ejecutar el esquema:", err);
  } finally {
    await client.end();
  }
}

run();
