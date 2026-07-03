const token = "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";

async function run() {
  try {
    const res = await fetch("https://api.github.com/user/repos", {
      method: "POST",
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "crm-asck",
        description: "CRM Interno de ASCK Software v1.8+",
        private: true
      })
    });
    
    if (res.status === 201) {
      console.log("¡Repositorio creado con éxito!");
      const data = await res.json();
      console.log("Clone URL:", data.clone_url);
    } else if (res.status === 422) {
      console.log("El repositorio ya existe en GitHub, continuando...");
    } else {
      const errText = await res.text();
      throw new Error(`Fallo al crear repositorio: ${res.status} - ${errText}`);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
