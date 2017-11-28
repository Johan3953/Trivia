//trivia questions, options and answers
var questions = [{
        question: "What is the name of Han Solo’s ship?",
        choices: ["Star Destroyer", "Slave I", "TIE Fighter", "Millennium Falcon"],
        correctAnswer: 3
    },

    {
        question: "What is the weapon used by Jedi Knights?",
        choices: ["Lightsaber", "Blasters", "Ryyk Blades", "Stun-Batons"],
        correctAnswer: 0
    },
    {
        question: "Which young Jedi Knight becomes Darth Vader in Star Wars: Episode III Revenge of the Sith?",
        choices: ["Luke Skywalker", "Anakin Skywalker", "Yoda", "Hans Solo"],
        correctAnswer: 1
    },
    {
        question: "What Jedi Master spent 800 years training such pupils as Qui-Gon Jinn, Obi-Wan Kenobi, Count Dooku and Luke Skywalker?",
        choices: ["Kylo Ren", "Darth Vader", "Yoda", "Sheev Palpatine"],
        correctAnswer: 2
    },
    {
        question: "Who are the masters of the Dark Side who want to rule the galaxy?",
        choices: ["The Jedi Knights", "The Sith", "The Dark Empire", "R2D2"],
        correctAnswer: 1
    },

    {
        question: "In the Star Wars film, what invisible power binds the galaxy together?",
        choices: ["Friendship", "The Imperials", "The Force", "The Jedi Knights"],
        correctAnswer: 2
    },
    {
        question: "Who is Luke and Leia’s mother?",
        choices: ["Darth Vader", "Ahsoka Tano", "Padmé Amidala", "Jar Jar Binks"],
        correctAnswer: 2
    }
];

var currentQuestion = 0;
var correctAnswers = 0;
var gameOver = false;

$(document).ready(function () {
    $(".trivia").hide();
    $("#progressBar").hide();
    $('.result').hide();


    $(".btn-info").click(function () {
        $(".trivia").show();
        $(".nextButton").show();
        $("#startMenu").hide();
        $("#progressBar").show();

    })

    function displayFirstQuestion() {

        var question = questions[currentQuestion].question;
        var questionClass = $(document).find(".trivia > .question");
        var choiceList = $(document).find(".trivia > .choiceList");
        var numChoices = questions[currentQuestion].choices.length;
        var imgSelect = questions[currentQuestion].img

        $(questionClass).text(question);

        $(choiceList).find("li").remove();

        var choice;
        for (i = 0; i < numChoices; i++) {
            choice = questions[currentQuestion].choices[i];
            $('<li><input type="radio" value=' + i + ' name="optradio"/>' + choice + '</li>').appendTo(choiceList);
        }
    };

    function progress(timeleft, timetotal, $element) {
        var progressBarWidth = timeleft * $element.width() / timetotal;
        $element.find("div").animate({
            width: progressBarWidth
        }, 600).html(timeleft);

        if (timeleft > 0) {
            setTimeout(function () {
                    progress(timeleft - 1, timetotal, $element);
                },
                1000);
        }
        if (progressBarWidth === 0) {
            console.log("Time's Up!");
            displayScore();
            $(".question, .choiceList, #progressBar").hide();
            console.log(resetTrivia);
            gameOver = true;
            clearInterval(progress);
            $(".nextButton").text("Play Again?");
            $('.nextButton').click(function () {
                location.reload();
            });
        }
    };
    progress(35, 35, $('#progressBar'));

    displayFirstQuestion();
    $(".nextButton").text("Next Question");


    $(this).find(".errorMessage").hide();
    $(".nextButton").on("click", function () {
        $(".nextButton").on("click", function () {
            displayFirstQuestion();
        })

        if (!gameOver) {

            value = $("input[type=radio][name=optradio]:checked").val();
            if (value === undefined) {
                $(document).find(".errorMessage").text("Please select an answer!");
                $(document).find(".errorMessage").show();
            } else {
                $(document).find(".errorMessage").hide();
                if (value == questions[currentQuestion].correctAnswer) {
                    console.log(value);
                    correctAnswers++;
                }
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    displayFirstQuestion();
                } else {
                    gameOver = true;
                    $(".question, .choiceList").hide();
                    $("#progressBar").hide();
                    displayScore();
                    $(".nextButton").text("Play Again?");
                    $(".nextButton").text("Play Again?");
                    $('.nextButton').click(function () {
                        location.reload();
                    });
                }
            }
        } else {
            gameOver = false;

            $(".nextButton").text("Next Question");
            resetTrivia();
            displayFirstQuestion();
            hideScore();
            $(".nextButton").text("Play Again?");
            $('.nextButton').click(function () {
                location.reload();
            });
        }
    });
});


function resetTrivia() {
    currentQuestion = 0;
    correctAnswers = 0;
    hideScore();
};

function displayScore() {
    $(document).find(".trivia > .result").text("Your Score: " + correctAnswers + " Correct out of: " + questions.length);

    $(document).find(".trivia > .result").show();
};

function hideScore() {
    $(document).find(".result").hide();
};