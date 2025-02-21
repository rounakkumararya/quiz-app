import { useEffect, useState } from "react";
import { openDB } from "../lib/db";

const History = () => {
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
    }, []);

    return (
        <div className="w-full max-h-[50%] min-w-sm max-w-[30%] p-16 mt-8  space-y-4   border border-gray-200 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Quiz history</h2>
            <hr className="bg-gray-200 border-0 h-px" />
            <ul className="space-y-2">
                {attempts.map((attempt) => (
                    <li key={attempt.id}>
                        Score: {attempt.score} - {new Date(attempt.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default History;