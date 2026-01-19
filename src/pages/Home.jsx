import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import api from '../api';


const Home = () => {
    const [totalVotes, setTotalVotes] = useState(0);
    const [showDisclaimer, setShowDisclaimer] = useState(true);
    const voteButtonRef = useRef(null);

    useEffect(() => {
        api.get('/stats')
            .then(res => setTotalVotes(res.data))
            .catch(console.error);

        const interval = setInterval(() => {
            api.get('/stats').then(res => setTotalVotes(res.data)).catch(console.error);
        }, 5000); // Live updates

        // Auto-scroll to "Vote Now" after a short delay for mobile UX
        const scrollTimer = setTimeout(() => {
            if (voteButtonRef.current) {
                voteButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 1500);

        return () => {
            clearInterval(interval);
            clearTimeout(scrollTimer);
        };
    }, []);

    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            {showDisclaimer && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.9)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        padding: '2rem',
                        borderRadius: '10px',
                        maxWidth: '600px',
                        textAlign: 'left'
                    }}>
                        <h2 style={{ marginBottom: '1rem', color: '#d32f2f' }}>Disclaimer</h2>
                        <p style={{ marginBottom: '1rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            This is an independent, voluntary, anonymous public opinion survey for educational and analytical purposes only.
                        </p>
                        <p style={{ marginBottom: '2rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
                            This is not an official election or exit poll and not affiliated with the Election Commission of India or any political party.
                            [இது கல்வி மற்றும் ஆய்வுக்காக நடத்தப்படும் பெயரில்லா பொது கருத்துக் கணிப்பு.
இது அதிகாரப்பூர்வ தேர்தல் அல்ல; இந்திய தேர்தல் ஆணையம் அல்லது எந்த அரசியல் கட்சியுடனும் தொடர்பில்லை.]
                        </p>
                        <button
                            onClick={() => setShowDisclaimer(false)}
                            style={{
                                backgroundColor: '#1a73e8',
                                color: '#fff',
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '5px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%'
                            }}
                        >
                            OK, I Understand
                        </button>
                    </div>
                </div>
            )}

            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '5rem', marginBottom: '1rem', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
                Tamil Nadu 2026 – Public Opinion Survey
            </motion.h1>

            <p style={{ fontSize: '1.8rem', color: '#f8fafc', fontWeight: '500' }}>
                Share your opinion anonymously. Responses are used only for survey analysis.
            </p>

            <Timer />

            <motion.div
                className="card"
                style={{ maxWidth: '400px', margin: '2rem auto' }}
            >
                <h3>Total Survey Responses</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {totalVotes.toLocaleString()}
                </div>
            </motion.div>

            <Link to="/vote">
                <button
                    ref={voteButtonRef}
                    className="btn-primary"
                    style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}
                >
                    Take Survey
                </button>
            </Link>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/results" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
                    ➡️ View Results for survey (Available Jan 25th 10am) ⬅️   © 2026 TN Public Opinion Survey [Arunkumar2003arun@gmail.com]
                </Link>
            </div>

        </div>
    );
};

export default Home;
