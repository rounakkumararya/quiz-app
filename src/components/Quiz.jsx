import React, { useEffect } from 'react'
import questions from '../questions.json'
import { GiStopwatch } from 'react-icons/gi';
import { saveAttempt } from '../lib/db';
import History from './History';

const Quiz = (attempts) => {
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [showScore, setShowScore] = React.useState(false);
    const [score, setScore] = React.useState(0);
    const [integerAnswers, setIntegerAnswers] = React.useState("");
    const [timeLeft, setTimeLeft] = React.useState(30);
    const [selectedAnswer, setSelectedAnswer] = React.useState("");
    const [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false);


    useEffect(() => {
        //for setting time intervals
        if (timeLeft === 0) {
            handleNextQuestion();
        }
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    console.log("call");



    const handleNextQuestion = () => {
        //if type is integer handle answer checking while next is clicked 
        if (questions[currentQuestion].type === "Integer") {
            if (parseInt(integerAnswers) === parseInt(questions[currentQuestion].correctAnswer)) {

                setScore(score + 1);
                setSelectedAnswer(integerAnswers);

            } else {
                alert("Wrong answer.Right answer is " + questions[currentQuestion].correctAnswer);
            }
        }
        if (currentQuestion < questions.length - 1) {
            //if current question is not the last question

            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
            setTimeLeft(30);
            setIntegerAnswers("");
            setShowCorrectAnswer(false);
        } else {
            //if current question is the last question

            if (parseInt(integerAnswers) === parseInt(questions[currentQuestion].correctAnswer)) {

                saveAttempt(score + 1);

            } else {
                saveAttempt(score);
            }
            setShowScore(true);
        }
    };


    const handleAnswer = (selectedAnswer) => {
        //if type is integer assign answer
        if (questions[currentQuestion].type === "Integer") {
            setIntegerAnswers(selectedAnswer);
        }


        if (selectedAnswer === questions[currentQuestion].correctAnswer && !showCorrectAnswer) {
            console.log("correct");
            setScore(score + 1);
            setSelectedAnswer(selectedAnswer);

        }


        setShowCorrectAnswer(true);



    };


    return (

        <div className="flex flex-col lg:flex-row gap-10 justify-between">
            <div className="w-full  min-w-[70%] p-16 mt-8  space-y-4   border border-gray-200 rounded-lg shadow-sm">
                {/* show score if showScore is true */}
                {showScore ? (
                    <div className='flex flex-col gap-10 items-center'>
                        <h1 className='text-3xl font-semibold'>You have completed the quiz</h1>
                        <hr className="bg-gray-200 border-0 h-px" />
                        <p className='text-9xl'>{score > 8 ? "🏅" : (score > 5 ? "👏" : (score > 3 ? "😒" : "😤"))}</p>
                        <p>{score > 6 ? "You did well" : (score > 4 ? "You did okay" : "Try harder")}</p>

                        <h2>Your Score: {score}/{questions.length}</h2>
                        <button onClick={() => window.location.reload()} className="bg-violet-600 max-w-[200px] hover:bg-violet-800  duration-500 text-white font-bold py-2 px-8 rounded ">Try Again</button>
                    </div>
                ) : (
                    //else show the questions
                    <div className="flex flex-col gap-10">
                        <div className="flex justify-between">

                            <h2 className="text-3xl font-medium text-gray-900 ">Question number {currentQuestion + 1}  <span className='text-sm     text-gray-500'>({questions[currentQuestion].type})</span></h2>
                            <p className='flex align-center text-center items-center gap-1 text-red-500 '><GiStopwatch className='' />   {timeLeft}s</p>
                        </div>
                        <hr className="bg-gray-200 border-0 h-px" />

                        <h1 className='text-start font-semibold text-xl'>{questions[currentQuestion].question}</h1>

                        <div className='text-start flex flex-col gap-2  '>
                            {questions[currentQuestion].type === "MCQ" ? (questions[currentQuestion].options.map((option, index) => (
                                //if showCorrectAnswer is true show the correct answer
                                <li style={{
                                    borderColor:
                                        showCorrectAnswer && option === questions[currentQuestion].correctAnswer
                                            ? "lightgreen"
                                            : showCorrectAnswer && selectedAnswer !== option
                                                ? "lightcoral"
                                                : "",


                                    cursor: showCorrectAnswer ? "default" : "pointer",
                                }} onClick={() => handleAnswer(option)} className=" has-checked:bg-gray-300 active:bg-gray-200 max-w-[90%] list-none border-2 focus cursor-pointer  border-gray-400 hover:bg-gray-200 rounded p-2 px-4" key={index} >{option}</li>
                            ))) : (

                                <input style={{ borderColor: integerAnswers ? (parseInt(integerAnswers) !== questions[currentQuestion].correctAnswer ? "red" : "lightgreen") : "" }} type="number" className='p-2 border-2 focus:border-0 focus:outline-none focus:ring-0 hover:border-gray-400 border-gray-300 rounded ' placeholder='Enter your answer in number ' onChange={(e) => setIntegerAnswers(e.target.value)} value={integerAnswers} />

                            )



                            }
                            <button type='submit' onClick={handleNextQuestion} className=' bg-emerald-400  max-w-[200px] hover:bg-emerald-800  duration-500 text-white font-bold py-2 px-8 rounded '>{currentQuestion === questions.length - 1 ? "Submit" : "Next"}</button>
                        </div>

                        <div className="">{currentQuestion + 1} / {questions.length}</div>
                    </div>
                )
                }
            </div >
            <History attempts={attempts} />
        </div>

    )
}

export default Quiz
