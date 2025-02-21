"use client"
import { useState } from 'react'
import Quiz from './Quiz';

const Hero = () => {
    const [quizStarted, setQuizStarted] = useState(false);


    return (
        <section className=' w-full min-h-[500px]  flex flex-col gap-5 items-center  justify-center text-center'>


            {!quizStarted ? (<div className='flex gap-5'>
                <div className="flex flex-col w-full   gap-5 items-center text-center p-5  ">

                    <h1 className='text-6xl font-semibold'>Welcome to the Quiz Platform...</h1>
                    <h2 className='text-xl'>Please click the button below to start the quiz</h2>
                    <button className="bg-violet-600 max-w-[200px] hover:bg-violet-800  duration-500 text-white font-bold py-2 px-8 rounded " onClick={() => setQuizStarted(true)}>Start Quiz</button>
                </div>

            </div>
            ) : (
                <>

                    <Quiz />
                </>
            )}


        </section >
    )
}

export default Hero