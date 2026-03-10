const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function main() {

  const url = `${API_BASE_URL}/rooms/public?from=2026-03-08T19:58:40.277Z&to=2026-03-11T19:58:40.277Z`;

  console.log(`Fetching ${url}...`);

  try {

    const response = await fetch(url);

    console.log(`Status: ${response.status} ${response.statusText}`);

    const data = await response.json();

    console.log("--- API RESPONSE ---");
    console.log(JSON.stringify(data, null, 2));

  } catch (err) {

    console.error("API Error", err);

  }

}

main();