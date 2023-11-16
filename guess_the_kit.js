CORRECT_ANSWER = "-"
CURRENT_SCORE = 0;
HIGH_SCORE = 55;
HAS_BEEN_ANSWERED = false;
NUMBER_OF_ANSWERS = 3;
KIT_FILES = ["kits/23-24_home.jpg", "kits/97-98_away.jpg"]
KIT_YEARS = ["69-70", "82-83", "87-88", "88-89", "90-91", "91-92", "94-95", "95-96", "97-98", "99-00", "00-01",
             "01-02", "02-03", "03-04", "04-05", "05-06", "07-08", "08-09", "09-10", "10-11", "11-12", "12-13",
             "13-14", "14-15", "15-16", "16-17", "17-18", "18-19", "19-20", "20-21", "21-22", "22-23", "23-24"]
HAS_FIREWORKS_RAN = false;

$(document).ready( function () {
    $("#nextBtn").click(function () {
        resetClasses();
        setUpAnswers();
        randomiseYears();
        HAS_BEEN_ANSWERED = false;
        $("#kit").css('filter', "blur(10px)") 
        $("#gameOverText").hide();
        $("#tryAgainBtn").hide();
        $("#nextBtn").show();
        $("#bonus").text("(+0!)")
    })

    $("#tryAgainBtn").click(function () {
        CURRENT_SCORE = 0;
        $("#score").text("Score : 0")

        resetClasses();
        setUpAnswers();
        randomiseYears();
        HAS_BEEN_ANSWERED = false;
        $("#kit").css('filter', "blur(10px)") 
        $("#gameOverText").hide();
        $("#tryAgainBtn").hide();
        $("#nextBtn").show();
        $("#bonus").text("(+0!)")

    })

    document.getElementById("bonus").addEventListener('transitionend', function(e) {$("#bonus").removeClass("fadeInOut"); });

    setUpAnswers()
    randomiseYears()

    function setUpAnswers() {
        var chosen_file = Math.floor(Math.random() * KIT_FILES.length)
        chosen_file = KIT_FILES[chosen_file]
        $("#kit").attr('src', chosen_file) 
        CORRECT_ANSWER = (chosen_file.substring(5).split("_")[0]);
        var time = setInterval(function() {
    
           var current_filter = getBlurLevel()
            if (Number(current_filter) <= 0) {
                clearInterval(time);
            }
            current_filter -= 0.1
            new_filter = "blur(" + current_filter + "px)"
    
            $("#kit").css('filter', new_filter) 
    
              }, 100);
    }

});

function getBlurLevel() {
    var current_filter = $("#kit").css('filter') 
    current_filter = current_filter.substring(5)
    current_filter = current_filter.substring(0 , current_filter.length - 3)
    return current_filter
}

function yearGuessed(val) {
    if (!HAS_BEEN_ANSWERED) {
        if (val.textContent == CORRECT_ANSWER){
            CURRENT_SCORE += 10
            var current_filter = getBlurLevel()
            $("#bonus").text("(+" + current_filter + "!)")
            CURRENT_SCORE += Number(current_filter)
            firework()
            $("#score").text("Score : " + CURRENT_SCORE)
            if ((CURRENT_SCORE > HIGH_SCORE) & (!HAS_FIREWORKS_RAN)) {
                $("#high_score").text("High Score : " + CURRENT_SCORE)
                HAS_FIREWORKS_RAN = true
                explosionFirework()
            }
            $("#bonus").addClass("fadeInOut")
        }
        else {
            console.log("WRONG");
            $("#gameOverText").show();
            $("#tryAgainBtn").show();
            $("#nextBtn").hide();
        }
    }
    HAS_BEEN_ANSWERED = true;

    $(".year_guess").each(function() {
        if (this.textContent == CORRECT_ANSWER) {
            $(this).addClass("correct_answer")
        }
        else {
            $(this).addClass("incorrect_answer")
        }
    });
}

function resetClasses() {
    $(".year_guess").each(function() {
        $(this).removeClass("incorrect_answer")
        $(this).removeClass("correct_answer")
    });
}

function randomiseYears() {
    correct_num = Math.floor(Math.random() * NUMBER_OF_ANSWERS) + 1
    correct_box = "#answer_box_" + correct_num
    $(correct_box).text(CORRECT_ANSWER);

    KIT_YEARS_WO_ANS = [...KIT_YEARS]

    const index = KIT_YEARS_WO_ANS.indexOf(CORRECT_ANSWER);
    if (index > -1) { // only splice array when item is found
        KIT_YEARS_WO_ANS.splice(index, 1); // 2nd parameter means remove one item only
    }

    for (let i = 1; i <= NUMBER_OF_ANSWERS; i++) {
        if (i == correct_num) {continue}
        var ind = Math.floor(Math.random() * KIT_YEARS_WO_ANS.length)
        var answer_box_id = "#answer_box_" + i
        $(answer_box_id).text(KIT_YEARS_WO_ANS[ind])
    }
}

function firework() {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}

function explosionFirework() {
    const duration = 15 * 1000,
  animationEnd = Date.now() + duration,
  defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

const interval = setInterval(function() {
  const timeLeft = animationEnd - Date.now();

  if (timeLeft <= 0) {
    return clearInterval(interval);
  }

  const particleCount = 50 * (timeLeft / duration);

  // since particles fall down, start a bit higher than random
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    })
  );
  confetti(
    Object.assign({}, defaults, {
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    })
  );
}, 250);
}