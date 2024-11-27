// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQDyZM4C_CGsKDPKZsYDCk8bxQYPeD56_Mb153gJ4yhdOe_bPXgbkqcrwslq5r6aph95yHGuNZiP4g5jBjfC54bslGiIJ2eJ7RAbWSfYDwO20K1TOMTYm8ZdK33rroKJEVXjnQRifvDJuJ1i1XDIEsqKhpfxAGe1I_oSVNelQh296G1i5nBGvD8ylhAn_voudQuKdJzD5lfLIA-_1PrZWUGy3UzajCFNrBaJKJ1n5xwoszq52apdL-8U928AwYYTXDjK7jn77mk1_wIM9b18WtCXtu0H--SB";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=long_term&limit=5", "GET")
  ).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);
