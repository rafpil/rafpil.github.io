class View {

    startView(cardsNumber = localStorage.getItem('cardsNumber') || 12, category = localStorage.getItem('category') || "pojazdy") {
        let content = "";
        let picNumber = 0;
        oneVisible = false;
        firstVisible = null;
        secondVisible = null;
        pairs = 0;
        rounds = 0;

        if (cardsNumber >= 8) {
            for (let i = 0; i < 2; i++) {
                content += '<div class="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">';
                content += '<div class="row">'
                for (let j = 0; j < cardsNumber; j++) {
                    content += '<div class="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-0 p-1">';
                    content += '<img id="pic' + picNumber++ + '"src="img/main_pic/first_page.jpg" class="rounded img-fluid borders pointer" data-event="true">';
                    content += '</div>'
                }
                content += '</div></div>';
            }
        } else if (cardsNumber == 4) {
            for (let j = 0; j < cardsNumber * 2; j++) {
                content += '<div class="col-3 col-sm-3 col-md-3 col-lg-3 col-xl-3 mb-0 p-1">';
                content += '<img id="pic' + picNumber++ + '"src="img/main_pic/first_page.jpg" class="rounded img-fluid borders pointer" data-event="true">';
                content += '</div>'
            }
        }

        $("#cardsView").html(content);

        let checkCard = new Card().check($("#cardsView img"), new Card().random(cardsNumber, category), category);

    };

    newGame() {
        this.startView();
    }

    winerView() {
        let gameTime = "";
        time = new Date(time);
        if (time.getHours() - 1) {
            gameTime += time.getHours() + " godz. ";
            gameTime += time.getMinutes() + " min. ";
            gameTime += time.getSeconds() + " sek.";
        } else if (time.getMinutes()) {
            gameTime += time.getMinutes() + " min. ";
            gameTime += time.getSeconds() + " sek.";
        } else {
            gameTime += time.getSeconds() + " sek.";
        }

        let content = '<div class="col-11 col-sm-10 col-md-9 col-lg-6 col-xl-6 alert alert-my" role="alert"> <p><b>GRATULACJE !!!</b></p>';
        content += '<p class="statistic">Liczba wykonanych ruchów: <b>' + rounds + '</b> </p>';
        content += '<p class="statistic">Czas rozgrywki: <b>' + gameTime + '</b></p></div>';
        return content;
    }

    howToPlay() {
        let content = '<div class="col-11 col-sm-10 col-md-12 col-lg-12 col-xl-12 alert alert-my" role="alert"> <p>Reguły gry</p>';
        content += '<p class="information"> Gra polega na wskazaniu pary takich samych kart. Gracz odsłania dwie karty. Jeśli są to takie same karty znikają z planszy, w przeciwnym przypadku będą one odwrócone z powrotem, a gracz będzie miał ok. 1 sek. na zapamiętanie ich położeń. Celem gry jest zdjęcie wszystkich kart przy możliwie najmniejszej liczbie odsłon. W grze liczony jest czas gry oraz liczba odsłon kart. </p>';

        return $("#cardsView").html(content);
    }

    imgInfo() {
        let content = '<div class="col-11 col-sm-10 col-md-12 col-lg-12 col-xl-12 alert alert-my" role="alert"> <p>Informacja o grafice</p>';
        content += '<p class="information"> Grafika użyta na niniejszej stronie pochodzi z serwisu <a target="_blank" href="https://pixabay.com">pixabay.com</a>, który rozpowszechnia m.in. wolne od praw autorskich obrazy. Udostępniona zawartość przez wskazany serwis pozwala na jej użycie bez pytania jak również bez przypisywania autorstwa, w tym również w celach komercyjnych.</p>';

        return $("#cardsView").html(content);
    }

    modal() {
        $('#spinner').modal('show');

        setTimeout(function () {
            $('#spinner').modal('hide');
        }, 500);
    }

    closeCookies() {
        $('#cookies').hide();
        localStorage.setItem('cookies', 'yes');

    }

    showCookies() {

        let content = '<div class="row "> <div class="col-11 col-sm-11 col-md-11 col-lg-11 col-xl-11 cookes-text"> <span> Niniejsza strona przechowuje dane w pamięci przeglądarki (localStorage) w celach funkcjonalnych - wyłączenie jej w przeglądarce może spowodować to ogarniczenie funkcjonalności strony.</span> </div> <div class="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 cookes-close" onclick="new View().closeCookies()"><span style="cursor: pointer;">&#10006;</span></div> </div></div>';
        console.log(localStorage.getItem('cookies'));
        if (localStorage.getItem('cookies') === null) $("#cookies").html(content).addClass('cookes-box');
    }
}

(function () {
    new View().startView();
    new View().showCookies();
})()
