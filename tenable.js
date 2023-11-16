ANSWERS = []
CORRECT_ANSWERS = 0
LIVES = 3

$(document).ready(function () {

    fillAnswers();

    $("#enterAnswers").click(function () {
        if ((ANSWERS != []) & (CORRECT_ANSWERS != 10) & (LIVES != 0)) {
            var answer = $("#answerArea").val();
            answers_lower = ANSWERS.map(answer => answer.toLowerCase());
            if (answers_lower.indexOf(answer.toLowerCase()) != -1) {
                correct_index = answers_lower.indexOf(answer.toLowerCase()) + 1;
                correct_answer_box = "#answer_box_" + correct_index
                if ($(correct_answer_box).text() == correct_index) {
                    $(correct_answer_box).text(ANSWERS[correct_index - 1]);
                    CORRECT_ANSWERS +=1;
                    firework();
                }
            }
            else {
                loseLife();
            }
            if (CORRECT_ANSWERS == 10) {
                console.log("YOU WIN!");
                explosionFirework();
            }
        }
    })

    var countDownDate = new Date()
    countDownDate.setSeconds ( countDownDate.getSeconds() + 2 );
    
    setInterval(function() {
        var now = new Date()
        
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

        if (distance < 0) {
          document.getElementById("timer").innerHTML = "OUT OF TIME!";
          loseLife(lose_all_lives=true)
          clearInterval();
          }
          }, 1000);
})

function fillAnswers() {
  const urlParams = new URLSearchParams(window.location.search);
  const greetingValue = urlParams.get('index');
  console.log(greetingValue);  

  $.getJSON("questions_nufc.json", function( data ) {
    var content = data['dates'][greetingValue]
    console.log(content)
    ANSWERS = content['answers']
    $("#quizQuestion").text(content['question'])
  });

  $("#retryButton").hide();
  $("#showAnswersBtn").hide();
  $("#lives").show();

  for (let i = 1; i <= 10; i++) {
      answer_box = "#answer_box_" + i
      $(answer_box).removeClass("incorrect_answer")
      $(answer_box).text(i)
  }
}

function showAnswers() {
    $("#showAnswersBtn").hide();
    for (let i = 1; i <= 10; i++) {
        answer_box = "#answer_box_" + i
        if (!isNaN($(answer_box).text())) {
            $(answer_box).addClass("incorrect_answer")
            $(answer_box).text(ANSWERS[i - 1])
        }
    }
}

function loseLife(lose_all_lives=false) {
    if ((LIVES == 0) | (lose_all_lives)) {
        LIVES = 0
        console.log("FAILURE");
        $("#lives").hide()
        $("#retryButton").show();
        $("#showAnswersBtn").show();
        return
    }
    var latest_life = "#heart_" + LIVES
    $(latest_life).attr("src","dead_pixel_heart.png");
    LIVES -=1;
}

function refilLives() {
    LIVES = 3;
    $("#heart_1").attr("src","pixel_heart.png");
    $("#heart_2").attr("src","pixel_heart.png");
    $("#heart_3").attr("src","pixel_heart.png");
}

function retryGame() {
    ANSWERS = []
    CORRECT_ANSWERS = 0
    LIVES = 3

    fillAnswers()
    refilLives()
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