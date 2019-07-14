let questionslist = {};
let trivia = {};

let questions;
let answers = ["B", "D", "A", "B", "D", "A", "B", "D"];

let intervalID;

// Timer Object ========================================================================================================
timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
        /*console.log("countdown");*/
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
        /*console.log(currentTime);*/
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
            /*$(".question-block").hide();*/
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
        /*console.log("Reset");*/
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};

// Question Object =====================================================================================================

function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "What race is Chewbacca?",
            A: "Mon Calamari",
            B: "Wookie",
            C: "Jawa",
            D: "Bantha",
        },
        q1: {
            question: "What give's lightsabers their color?",
            A: "The owner's energy.",
            B: "The planet it was made on.",
            C: "The owner's age.",
            D: "The crystals used to make them.",
        },
        q2: {
            question: "What is the name of the snow planet in Episode V?",
            A: "Hoth",
            B: "Endor",
            C: "Alderaan",
            D: "Naboo",
        },
        q3: {
            question: "What is the name of the only Super Star Destroyer see in the films, Darth Vader's flagship?",
            A: "Devastator",
            B: "Executor",
            C: "Dominator",
            D: "Lusankya",
        },
        q4: {
            question: "How did Han Solo acquire the Millenium Falcon?",
            A: "Stole it.",
            B: "Won it in a raffle.",
            C: "Bought it.",
            D: "Won it in a Sabacc game.",
        },
        q5: {
            question: "What was Luke's call sign in Episode IV?",
            A: "Red Five",
            B: "Big Red",
            C: "Rogue Five",
            D: "Epic One",
        },
        q6: {
            question: "What system can Cloud City can be found in?",
            A: "Lando",
            B: "Bespin",
            C: "Dagobah",
            D: "Corellia",
        },
        q7: {
            question: "Who is the bounty hunter who finally delivers Han to Jabba?",
            A: "Bossk",
            B: "Zuckuss",
            C: "Dengar",
            D: "Boba Fett",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}

// Question Time =======================================================================================================

$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});