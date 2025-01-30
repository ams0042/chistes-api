$(document).ready(function () {
    const apiUrl = "https://v2.jokeapi.dev/joke";
    const language = "es"; // Español

    // Obtener chiste aleatorio
    $("#randomJokeBtn").click(function () {
        fetchJoke(`${apiUrl}/Any?lang=${language}`);
    });

    // Buscar por palabra clave
    $("#searchBtn").click(function () {
        let query = $("#search").val().trim();
        if (query === "") {
            alert("Ingresa una palabra clave para buscar un chiste.");
            return;
        }
        fetchJoke(`${apiUrl}/Any?contains=${encodeURIComponent(query)}&lang=${language}`);
    });

    // Buscar por categoría
    $("#category").change(function () {
        let category = $(this).val();
        if (category) {
            fetchJoke(`${apiUrl}/${category}?lang=${language}`);
        }
    });

    function fetchJoke(url) {
        $.getJSON(url, function (data) {
            let joke = "";
            if (data.type === "single") {
                joke = data.joke;
            } else if (data.type === "twopart") {
                joke = `${data.setup} <br><br> ${data.delivery}`;
            } else {
                joke = "No se encontró un chiste para los criterios seleccionados.";
            }
            $("#jokeContainer").html(joke);
        }).fail(function () {
            $("#jokeContainer").html("Error al obtener el chiste.");
        });
    }
});
