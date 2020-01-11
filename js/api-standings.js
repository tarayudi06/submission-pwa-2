var base_url = "https://api.football-data.org/v2/";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
function getArticles() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2021/standings").then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    const {
                        standings: [{
                            table: tableData
                        }]
                    } = data;
                    const articlesHTML = tableData.reduce(
                        (html, {
                            position,
                            team: {
                                crestUrl,
                                name
                            },
                            playedGames,
                            won,
                            draw,
                            lost,
                            points
                        }) => html += `
                        <tr>
                        <td>${position}</td>
                          <td><img style="width:45px; height:49px;" src="${crestUrl}"/></td>
                          <td>${name}</td>
                          <td>${playedGames}</td>
                          <td>${won}</td>
                          <td>${draw}</td>
                          <td>${lost}</td>
                          <td>${points}</td>
                       </tr>
                      `, '');
                    document.getElementById("table").innerHTML += tableHTML;
                });
            }
        });
    }

    fetch(base_url + "competitions/2021/standings", {
            method: "GET",
            headers: {
                "X-Auth-Token": "2ddc7ce587644212915e77cfd7b883c9"
            }
        })

        .then(status)
        .then(json)
        .then(function (data) {
            // Objek/array JavaScript dari response.json() masuk lewat data.

            // Menyusun komponen card artikel secara dinamis
            const {
                standings: [{
                    table: tableData
                }]
            } = data;
            const articlesHTML = tableData.reduce(
                (html, {
                    position,
                    team: {
                        crestUrl,
                        name
                    },
                    playedGames,
                    won,
                    draw,
                    lost,
                    points
                }) => html += `
            <table class="striped">
            <span>
            <tbody>
            <td>${position}</td>
            <td><img style="width:25px; height:29px;" src="${crestUrl}"/></td> 
              <td>${name}</td>
              <td>${playedGames}</td>
              <td>${won}</td>
              <td>${draw}</td>
              <td>${lost}</td>
              <td>${points}</td>
           </tbody>
           </span>
           </table>
          `, '');
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("articles").innerHTML = articlesHTML;
        })
        .catch(error);
}