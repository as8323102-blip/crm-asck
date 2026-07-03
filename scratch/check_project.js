async function check() {
  const url = "https://sjhmoyamcnfzugnqnpxv.supabase.co/rest/v1/";
  const anonKey = "sb_publishable_o-FHT-AvmXs4Gsa254VSeA_4mlUBPlY";

  try {
    console.log("Haciendo petición a Supabase REST API...");
    const res = await fetch(url, {
      headers: {
        'apikey': anonKey,
        'Authorization': `Bearer ${anonKey}`
      }
    });

    console.log("Status:", res.status);
    const headers = {};
    res.headers.forEach((val, key) => {
      headers[key] = val;
    });
    console.log("Headers:", JSON.stringify(headers, null, 2));

    const text = await res.text();
    console.log("Response text:", text);
  } catch (err) {
    console.error("Error al conectar:", err);
  }
}

check();
