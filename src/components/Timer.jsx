import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {
        const now = new Date();
        // Set strict target: Jan 25, 2026 10:00:00
        const target = new Date();
        target.setFullYear(2026, 0, 25); // Month is 0-indexed (0 = Jan)
        target.setHours(10, 0, 0, 0);

        const difference = target - now;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="timer-box">
            {Object.keys(timeLeft).length > 0 ? (
                <>
                    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="timer-segment">
                        <span>{timeLeft.days}</span>
                        <span className="timer-label">Days</span>
                    </motion.div>
                    <span>:</span>
                    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="timer-segment">
                        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                        <span className="timer-label">Hours</span>
                    </motion.div>
                    <span>:</span>
                    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="timer-segment">
                        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                        <span className="timer-label">Mins</span>
                    </motion.div>
                    <span>:</span>
                    <motion.div initial={{ y: -10 }} animate={{ y: 0 }} className="timer-segment">
                        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                        <span className="timer-label">Secs</span>
                    </motion.div>
                </>
            ) : (
                <span>Results are LIVE!</span>
            )}
        </div>
    );
};

export default Timer;
