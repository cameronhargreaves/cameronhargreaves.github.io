PLAYERS_IN_USE = []
PREVIOUS_VAL = null
CURRENT_VAL = null
HIGHER_SELECTED = false
LOWER_SELECTED = false
CURRENT_SCORE = 0

$(document).ready(function () {
    createNextElem();

    createNextElem();
    
    createNextElem();

    $("body").on("click", ".nextBtn",(function() {

        HIGHER_SELECTED = false;
        LOWER_SELECTED = false;

        HIGHER_SELECTED = (jQuery(this).text() == "More") 
        LOWER_SELECTED = (jQuery(this).text() == "Less") 

        $(".guess").first().addClass("remove")
        const element = document.getElementsByClassName("remove");

        
        var previous_title = $(".guess .title").first().text()
        console.log(previous_title);
        var current_title = $(".guess .title").eq(1).text()
        
        $.getJSON( "higher_or_lower_data.json", function( data ) {
            CURRENT_VAL = data[current_title]['goals']
            PREVIOUS_VAL = data[previous_title]['goals']
            
            if (CURRENT_VAL > PREVIOUS_VAL) {
                if (HIGHER_SELECTED){  //correct
                    CURRENT_SCORE += 1
                    $("#score").text("Score : " + CURRENT_SCORE)
                }
                else { //incorrect
                    console.log("incorrect");
                    CURRENT_SCORE = 0
                    $("#score").text("Score : " + CURRENT_SCORE)

                }
            }
            else {
                console.log("lower")
                if (LOWER_SELECTED){  //correct
                    CURRENT_SCORE += 1
                    $("#score").text("Score : " + CURRENT_SCORE)
                }
                else { //incorrect
                    console.log("incorrect");
                    CURRENT_SCORE = 0
                    $("#score").text("Score : " + CURRENT_SCORE)

                }
            }

            element[0].remove(); 
            PLAYERS_IN_USE.shift();
            createNextElem();
    
            const buttons = document.getElementsByClassName("nextBtn");
            buttons[0].remove(); 
            buttons[0].remove(); 

            var hidden_goals = $(".guess .hidden").first()
            hidden_goals.removeClass('hidden')

        });


        // $(".guess").animate({right: "auto", 1000);
    }));
});


function createNextElem() {

    $.getJSON( "higher_or_lower_data.json", function( data ) {
        ALL_PLAYERS = Object.keys(data)

        CHOSEN_PLAYER = Math.floor(Math.random() * ALL_PLAYERS.length)
        CHOSEN_PLAYER = ALL_PLAYERS[CHOSEN_PLAYER]

        var EXIT = false

        if (PLAYERS_IN_USE.indexOf(CHOSEN_PLAYER) == -1) {
            var previous_title = $(".guess .title").last().text()
            console.log(previous_title);
    
            if (previous_title) {
                if (data[CHOSEN_PLAYER]['goals'] == data[CHOSEN_PLAYER]['goals']) {
                    EXIT = false
                }
            }
            else {
                EXIT = true
            }
        }

        while (EXIT == false) {
            ALL_PLAYERS = Object.keys(data)

            CHOSEN_PLAYER = Math.floor(Math.random() * ALL_PLAYERS.length)
            CHOSEN_PLAYER = ALL_PLAYERS[CHOSEN_PLAYER]

            if (PLAYERS_IN_USE.indexOf(CHOSEN_PLAYER) == -1) { // if player is not in use, continue
                var previous_title = $(".guess .title").last().text()
        
                if (previous_title) {
                    if (data[CHOSEN_PLAYER]['goals'] == data[previous_title]['goals']) {
                        EXIT = false;
                        continue;
                        }
                    }
                EXIT = true
            }
        }

        const elem = document.createElement(`div`);
        elem.className = 'guess';
    
        var header = document.createElement("H1");
        header.className = "title"
        var t = document.createTextNode(CHOSEN_PLAYER);
        header.appendChild(t);
    
        var subheader = document.createElement("H2");
        var t = document.createTextNode("has");
        subheader.appendChild(t);
    
        const active_elems = document.getElementsByClassName("guess");

        var goalsVal = document.createElement("H1");
        var t = document.createTextNode(data[CHOSEN_PLAYER]['goals']);
        if (active_elems.length != 0) {
            goalsVal.className = 'hidden'
        }
        goalsVal.appendChild(t);    
        
        elem.appendChild(header);
        elem.appendChild(subheader);
        elem.appendChild(goalsVal);


        if (active_elems.length != 0) {
            var higher_button = document.createElement("button");
            var t = document.createTextNode("More");
            higher_button.className = "nextBtn"
            higher_button.appendChild(t); 
            
            var lower_button = document.createElement("button");
            var t = document.createTextNode("Less");
            lower_button.className = "nextBtn"
            lower_button.appendChild(t); 
            elem.appendChild(higher_button)
            elem.appendChild(lower_button)
        }

        var goals = document.createElement("H2");
        var t = document.createTextNode("goals");
        goals.appendChild(t);    
        
        elem.appendChild(goals);
    

        var backgroundImg = "url(" + data[CHOSEN_PLAYER]['img_file'] + ")"

        elem.style.backgroundImage=backgroundImg
        elem.style.backgroundSize = "cover";
        elem.style.backgroundPosition = "center center";
    
        document.getElementById("main_content").appendChild(elem);

        $(".title").each(function() {
            if (PLAYERS_IN_USE.indexOf($(this).text()) == -1) {
                PLAYERS_IN_USE.push($(this).text())
            }
        });

    });

}