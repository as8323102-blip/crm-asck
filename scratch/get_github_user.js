const token = "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";

async function run() {
  try {
    const res = await fetch("https://api.github.com/user", {
      headers: {
        "Authorization": `token ${token}`,
        "Accept": "application/vnd.github.v3+json"
      }
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    console.log("GitHub Username:", data.login);
    console.log("GitHub Name:", data.name);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
