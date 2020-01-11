window.addEventListener("load", function () {
    const url = "https://api.football-data.org/v2/competitions/2001/matches?status=SCHEDULED";

    fetch(url, {
            method: "GET",
            mode: 'cors',
            headers: {
                "X-Auth-Token": "2ddc7ce587644212915e77cfd7b883c9"
            }
        })
        .then(resp => resp.json())
        .then(function (data) {
            console.log(data);

            const {
                tableData = [{
                    homeTeam: `${data.matches[0].homeTeam.name}`,
                    awayTeam: `${data.matches[0].awayTeam.name}`
                }]
            } = data;

            tableData.forEach(homeTeam, awayTeam => {
                rowDataHTML += `
                    <h3>
                        ${homeTeam} VS ${awayTeam}
                    <h3>
                    `,
                    ""
            });

            document.getElementById("output").innerHTML += rowDataHTML;
        });
});