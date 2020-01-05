const pojazdy = 37;
const zwierzeta = 58;
const krajobrazy = 38;
const dania = 85;
const warzywa = 68;

let oneVisible = false;
let firstVisible = null;
let secondVisible = null;
let pairs = 0;
let rounds = 0;
let time = 0;

class Card {

    random(cardsNumber, category) {
        let cardsPositions = [];
        let cardsList = [];
        let range = null;
        switch (category) {
            case "pojazdy":
                range = pojazdy;
                break;
            case "zwierzeta":
                range = zwierzeta;
                break;
            case "krajobrazy":
                range = krajobrazy;
                break;
            case "dania":
                range = dania;
                break;
            case "owoce_i_warzywa":
                range = warzywa;
                break;
        }

        for (let i = 0; i <= range; i++) {
            cardsList[i] = i;
        }

        for (let i = 0; i < cardsNumber; i++) {
            let chooseCard = cardsList[Math.floor((Math.random() * (cardsList.length)))];
            cardsList.splice(cardsList.indexOf(chooseCard), 1);
            let preLoadImg = "<img src='img/" + category + "/" + chooseCard + ".jpg' height='0' width='0'>";
            $("#preloadImg").append(preLoadImg);

            cardsPositions.splice(Math.floor((Math.random() * (cardsPositions.length))), 0, chooseCard);
            cardsPositions.splice(Math.floor((Math.random() * (cardsPositions.length))), 0, chooseCard);
        }

        cardsPositions.sort((val1, val2) => {
            let rand1 = Math.round(Math.round() * (cardsPositions.length)),
                rand2 = Math.round(Math.round() * (cardsPositions.length));
            return rand1 - rand2;
        })

        return cardsPositions;
    }

    check(allCards, cards, category) {
        time = Date.now();
        allCards.on("click", function checkCards() {
            if (oneVisible == false) {
                $(this).off("click");
                firstVisible = $(this).attr("id").substr(3);
                $(this).attr("src", "img/" + category + "/" + cards[firstVisible] + ".jpg");
                $(this).addClass("active-border");
                oneVisible = true;
            } else {
                allCards.off("click");
                secondVisible = $(this).attr("id").substr(3);
                $(this).attr("src", "img/" + category + "/" + cards[secondVisible] + ".jpg");
                $(this).addClass("active-border");
                if (cards[secondVisible] == cards[firstVisible]) {

                    ++rounds;

                    setTimeout(function () {
                        $("#cardsView #pic" + firstVisible)
                            .addClass("win-border")
                            .animate({ "opacity": 0 }, 500)
                            .attr("data-event", 'false');
                        $("#cardsView #pic" + secondVisible)
                            .addClass("win-border")
                            .animate({ "opacity": 0 }, 500)
                            .attr("data-event", 'false');
                    }, 700);

                    if (++pairs == allCards.length / 2) {
                        time = (Date.now() - time);
                        $("#cardsView").html(new View().winerView());
                    };

                } else {
                    ++rounds;
                    setTimeout(
                        () => $("#cardsView #pic" + firstVisible + ", " +
                            "#cardsView #pic" + secondVisible)
                            .attr("src", "img/main_pic/first_page.jpg"), 1000);
                }

                setTimeout(function () {
                    $("#cardsView img[data-event='true']").on("click", checkCards);
                    oneVisible = false;
                    $("#cardsView #pic" + firstVisible + ", " +
                        "#cardsView #pic" + secondVisible).removeClass("active-border");
                }, 1000);
            }
        })
    }

    changeCardsNumber() {
        let cardsNumber = $("#modalCardsNumber input:checked").val() / 2;
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('cardsNumber', cardsNumber);
        } else {
            console.log("Web Storage nie wspierany");
        }
        return new View().startView(cardsNumber, localStorage.getItem('category') || "pojazdy");
    };

    changeCategory() {
        let category = $("#modalCategory input:checked").val();

        if (typeof (Storage) !== "undefined") {
            localStorage.setItem('category', category);
        } else {
            console.log("Web Storage jest nie wspierany");
        }

        return new View().startView(localStorage.getItem('cardsNumber') || 12, category);
    };
}