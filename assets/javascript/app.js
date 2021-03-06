$(document).ready(function() {

    //question object
    let questions = [ {
            question: "What is the capital of Germany?",
            answers: ["Berlin", "Frankfurt", "Hamburg", "Oktoberfest"],
            correctAnswer:"Berlin",
        }, {
            question: "What is the smallest country in the world?",
            answers: ["Monaco", "Vatican City", "Andorra", "Unknown, scientists are still looking"],
            correctAnswer:"Vatican City",
        }, {
            question: "What is the deepest point on Earth?",
            answers: ["Dead Sea", "A Lonely Saturday Night", "Mariana Trench", "Death Valley"],
            correctAnswer:"Mariana Trench",
        }, {
            question: "What is the most populous metropolitan area?",
            answers: ["A BART train during rush hour", "New York", "Mexico City", "Tokyo"],
            correctAnswer:"Tokyo",
        }, {
            question: "What is the largest freshwater lake in the world by volume?",
            answers: ["Lake Baikal", "Lake Chabot", "Lake Superior", "Lake Tahoe"],
            correctAnswer:"Lake Baikal",
        }, {
            question: "What is the least densely populated country in the world?",
            answers: ["Canada", "One of my birthday parties", "Mongolia", "Russia"],
            correctAnswer:"Mongolia",
        }, {
            question: "What country has the oldest flag?",
            answers: ["Denmark", "Egypt", "France", "New Jersey"],
            correctAnswer:"Denmark",
        }, {
            question: "What is the closest US state to Africa?",
            answers: ["Florida", "South Carolina", "Maine", "Virginia"],
            correctAnswer:"Maine",
        }, {
            question: "Where is Timbuktu?",
            answers: ["It is a fictional city", "Mali", "Botswana", "Republic of Congo"],
            correctAnswer:"Mali",
        }, {
            question: "What city has the busiest airport in the world?",
            answers: ["Los Angeles", "London", "Shanghai", "Atlanta"],
            correctAnswer:"Atlanta",
        }, {
            question: "The United Kingdom is comprised of how many countries?",
            answers: ["Three", "Four", "Six", "Fifty"],
            correctAnswer:"Four",
        }, {
            question: "Which Country currently has the largest oil reserves in the world?",
            answers: ["Venezuela", "Saudi Arabia", "Pizzaland", "Iraq"],
            correctAnswer:"Venezuela",
        }];

        //
    $(document).on('click', '#start', function(event) {
        $('#timer').prepend('<h2>Time Remaining: <span id="clockFace">15</span> Seconds</h2>');
        questionGetter();
    });
    
    $(document).on('click', '#start-over', function(event) {
        reset();
    });
    
    $(document).on('click', '.answer-buttons', function(event) {
        clicked(event);
    });
    
        let currentQuestion = 0;
        let clock = 15;
        let correct = 0;
        let wrong = 0;
        let dingding = new Audio ("assets/sounds/winning.mp3")
        let bzzt = new Audio ("assets/sounds/losing.mp3")
        let outtaTime = new Audio ("assets/sounds/timesup.mp3")

        function questionGetter(){
        $('#timer').show();
        timer = setInterval(clockTick, 1000);
        $('#testing-ground').html('<p>' + questions[currentQuestion].question + '</p>' );
        for (var i = 0; i < questions[currentQuestion].answers.length; i++){
            $('#testing-ground').append('<button class="answer-buttons"' + 'data-name="' + questions[currentQuestion].answers[i] + '">' + questions[currentQuestion].answers[i]+ '</button>');
        }
        }

        function clockTick(){
            clock--;
            $('#clockFace').html(clock);
        
            if (clock === 0){
                timeUp();
            }
        }

        function timeUp(){
            outtaTime.play();
            clearInterval(timer);
            $('#clockFace').html(clock);
        
            $('#testing-ground').html('<p>Apologies, But Time Is Up</p>');
            $('#testing-ground').append('<p>The Correct Answer was: ' + questions[currentQuestion].correctAnswer);
        
            if (currentQuestion === questions.length - 1){
                setTimeout(endScreen, 1000 * 3);
            } else {
                setTimeout(questionTransition, 1000 * 4);
            }
        }

        function questionTransition(){
        clock = 15;
        $('#clockFace').html(clock);
        currentQuestion++;
        questionGetter();
        }

        function endScreen() {
        clearInterval(timer);
    
        $('#testing-ground').html('<h2>Now Wasn\'t that fun?</h2>');
        $('#clockFace').html(clock);
        $('#timer').hide();
        $('#testing-ground').append('<p>Correct: ' + correct + '</p>');
        $('#testing-ground').append('<p>Incorrect: ' + wrong + '</p>');
        $('#testing-ground').append('<p>Timed-Out: ' + (questions.length - (wrong + correct)) + '</p>');
        $('#testing-ground').append('<button id="start-over">Relive This Madness?</button>');
        }


        function clicked(event) {
        clearInterval(timer);
    
        if ($(event.target).data("name") === questions[currentQuestion].correctAnswer){
            rightScreen();
        } else {
            wrongScreen();
        }
        }

        function wrongScreen() {
            wrong++;
            bzzt.play();
        $('#testing-ground').html('<p>No, That Is Incorrect. A shame...</p>');
        $('#testing-ground').append('<p>The Correct Answer Was... ' + questions[currentQuestion].correctAnswer + '</p>');
        clearInterval(timer);
    
        if (currentQuestion === questions.length - 1){
            setTimeout(endScreen, 1000 * 4);
        } else {
            setTimeout(questionTransition, 1000 * 4);
        }
        }

        function rightScreen(){
        clearInterval(timer);
        correct++;
        dingding.play();
        $('#testing-ground').html('<p>Yes, That Is Right. Impressive.</p>');
    
        if (currentQuestion === questions.length - 1){
            setTimeout(endScreen, 1000 * 4);
        } else {
            setTimeout(questionTransition, 1000 * 4);
        }
        }

        function reset(){
        currentQuestion = 0;
        clock = 15;
        correct = 0;
        wrong = 0;
        questionGetter();
        }

});