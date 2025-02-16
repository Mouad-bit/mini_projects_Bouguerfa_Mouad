// initialize the final score
var score=0;


// data list
var  quizQuestions=[];

// getting data from the user and creating apiUrl
document.getElementById("form-api").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent form from resetting

    // Get updated values from form inputs
    let amount = document.getElementById("trivia_amount").value;
    let category = document.getElementById("trivia_category").value;
    let difficulty = document.getElementById("trivia_difficulty").value;
    let type = document.getElementById("trivia_type").value;

    // Construct the API URL with user input values
    let apiUrl = `https://opentdb.com/api.php?amount=${amount}`;

    if (category !== "any") apiUrl += `&category=${category}`;
    if (difficulty !== "any") apiUrl += `&difficulty=${difficulty}`;
    if (type !== "any") apiUrl += `&type=${type}`;

    // Fetch data from the API
    let response = await fetch(apiUrl);
    let data = await response.json();
    quizQuestions = data.results;

    // starting the quiz
    start();
});




//start the quiz
let count=0;
function start(){
    document.getElementById("quiz").style.display = "none";
    document.getElementById("header").style.display = "flex";
    document.getElementById("container").style.display = "block";
    document.getElementById("next").style.display = "flex";

    // First question 
    document.getElementById("num").innerText = 1 ;

    question = document.getElementById("question");
    res1 = document.getElementById("res1");
    res2 = document.getElementById("res2");
    res3 = document.getElementById("res3");
    res4 = document.getElementById("res4");

    question.innerText = quizQuestions[0]["question"];
    // displaying the answers
    res1.innerText = quizQuestions[0]["correct_answer"];
    res2.innerText = quizQuestions[0]["incorrect_answers"][0];
    if (quizQuestions[0]["incorrect_answers"][1]){
         res3.innerText = quizQuestions[0]["incorrect_answers"][1];
    }
    else{
        res3.innerText = "";
    }

    if (quizQuestions[0]["incorrect_answers"][2]){
         res4.innerText = quizQuestions[0]["incorrect_answers"][2];
    }
    else{
        res4.innerText = "";
    }

    document.getElementById("questions-answered").innerText += "1/" + quizQuestions.length;

    
    function counter(){
        if (count < 10){
            count++
        }
        else{
            count = 0
            change_question();
        }
        document.getElementById("time-left").innerText =  count +"/10";

    }
    setInterval(counter,1000);

    // Listen for radio button selection
    let radioButtons = document.querySelectorAll('input[name="res"]');
    radioButtons.forEach(radio => {
        radio.addEventListener("change", function() {
            selectedAnswer = this.nextElementSibling.innerText; // Save the selected answer
        });
    });
    

}

// change questions
let selectedAnswer = null;
function change_question(){
    count = 0;
    let num = Number(document.getElementById("num").innerText);// number of the previous question


    console.log(quizQuestions);
    // check if the answer is correct

    if (num <= quizQuestions.length){
        correct_answer = quizQuestions[num-1]["correct_answer"];
    }

    if(selectedAnswer){
            if ( selectedAnswer == correct_answer){
                score += 1;
            }
    }
    
    num += 1 // the number of the current question

    // change the number of questions answered
    document.getElementById("questions-answered").innerText =  num +"/" + quizQuestions.length;

    // check if the quiz is done
    if (num > quizQuestions.length){
        document.getElementById("quiz").style.display = "none";
        document.getElementById("header").style.display = "none";
        document.getElementById("container").style.display = "none";
        document.getElementById("next").style.display = "none";
        document.getElementById("score").style.display = "flex";
        document.getElementById("result").innerText = ((score/quizQuestions.length)*100).toFixed(2) + "%" ;
        
    }

    // change the question number
    document.getElementById("num").innerText = num ;

    // change the question's data
    question = document.getElementById("question");
    res1 = document.getElementById("res1");
    res2 = document.getElementById("res2");
    res3 = document.getElementById("res3");
    res4 = document.getElementById("res4");

    if (num <=  quizQuestions.length){
        question.innerText = quizQuestions[num-1]["question"];

        // displaying the answers
        res1.innerText = quizQuestions[num-1]["correct_answer"];
        res2.innerText = quizQuestions[num-1]["incorrect_answers"][0];
        if (quizQuestions[num-1]["incorrect_answers"][1]){
            res3.innerText = quizQuestions[num-1]["incorrect_answers"][1];
        }
        else{
            res3.innerText = "";
        }

        if (quizQuestions[num-1]["incorrect_answers"][2]){
            res4.innerText = quizQuestions[num-1]["incorrect_answers"][2];
        }
        else{
            res4.innerText = "";
        }
        }

    selectedAnswer = null; //reset the selected answer for the next question

    // reset radio buttons 
    document.getElementById("form").reset();
    
    


}




