"use client"
import { useEffect, useState } from 'react'
import Quiz from './Quiz';
import { FaAngleDown } from 'react-icons/fa';
import { deleteDb, openDB } from '../lib/db';

const Hero = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [attempts, setAttempts] = useState([]);

    useEffect(() => {
        const fetchAttempts = async () => {
            const db = await openDB();
            const transaction = db.transaction("QuizAttempts", "readonly");
            const store = transaction.objectStore("QuizAttempts");
            const request = store.getAll();
            request.onsuccess = () => setAttempts(request.result);
        };
        fetchAttempts();
    }, [quizStarted, attempts]);



    return (
        <section className=' w-full min-h-[500px]  flex flex-col gap-5 items-center  justify-center text-center'>


            {!quizStarted ? (<div className='flex gap-5 mt-28'>
                <div className="flex flex-col w-full   gap-5 items-center text-center  ">

                    <h1 className='text-6xl font-semibold'>Welcome to the Quiz Platform...</h1>
                    <div className="m-2 max-w-[80%] ">
                        <div
                            className="group flex flex-col gap-2 rounded-lg bg-gray-50 p-4 text-black"
                            tabIndex="1"
                        >
                            <div className="flex cursor-pointer items-center justify-between">
                                <span className='text-md font-semibold'> Please read the instructions below </span>
                                <FaAngleDown />
                            </div>
                            <div
                                className="invisible h-auto max-h-0 items-center opacity-0 transition-all group-focus:visible group-focus:max-h-screen group-focus:opacity-100 group-focus:duration-1000"
                            >
                                <ol className='list-disc font-extralight text-sm flex flex-col gap-2 text-start'>
                                    <li> For multiple-choice questions, select the one best answer (A, B, C, or D)</li>
                                    <li>For integer-type questions, write your numerical answer clearly.</li>
                                    <li>Each questions have a time limit of 30 seconds</li>
                                    <li>You have only five attempts.</li>
                                </ol>
                            </div>
                        </div>

                    </div>
                    <h2 className='text-xl'>Please click the button below to start the quiz</h2>
                    <div className="flex gap-5">

                        <button disabled={attempts.length >= 5} className="bg-violet-600 max-w-[200px] hover:bg-violet-800  duration-500 text-white font-bold py-2 px-8 rounded " onClick={() => setQuizStarted(true)}>Start Quiz</button>
                        {
                            attempts.length > 0 &&
                            <button className=" align-bottom bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={async () => { await deleteDb().then(location.reload()) }}>Delete history</button>
                        }
                    </div>

                    <p>Attempts left : {5 - attempts.length}</p>
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