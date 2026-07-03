import pg from 'pg';

const ipDirect = "2600:1f13:5fd:be01:1c28:df2b:c847:a6dc";

async function test() {
  console.log(`Intentando conectar directamente a la dirección IPv6: [${ipDirect}]...`);
  const client = new pg.Client({
    host: ipDirect,
    port: 5432,
    user: 'postgres',
    password: 'Adair0830qwr',
    database: 'postgres',
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log("¡CONECTADO CON ÉXITO A IPv6 DIRECTO!");
    const res = await client.query("SELECT VERSION();");
    console.log("Versión:", res.rows[0].version);
    await client.end();
  } catch (err) {
    console.error("Fallo de conexión a IPv6:", err);
  }
}

test();
