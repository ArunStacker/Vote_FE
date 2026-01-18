import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Timer from '../components/Timer';
import api from '../api';


const Home = () => {
    const [totalVotes, setTotalVotes] = useState(0);

    useEffect(() => {
        api.get('/stats')
            .then(res => setTotalVotes(res.data))
            .catch(console.error);

        const interval = setInterval(() => {
            api.get('/stats').then(res => setTotalVotes(res.data)).catch(console.error);
        }, 5000); // Live updates
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container" style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ fontSize: '5rem', marginBottom: '1rem', color: '#ffffff', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
            >
                Tamil Nadu Election 2026
            </motion.h1>

            <p style={{ fontSize: '1.8rem', color: '#f8fafc', fontWeight: '500' }}>
                Your Vote, Your Future. Every vote counts towards analysing the next CM.
            </p>

            <Timer />

            <motion.div
                className="card"
                style={{ maxWidth: '400px', margin: '2rem auto' }}
            >
                <h3>Total Votes Cast</h3>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                    {totalVotes.toLocaleString()}
                </div>
            </motion.div>

            <Link to="/vote">
                <button className="btn-primary" style={{ fontSize: '1.5rem', padding: '1rem 3rem' }}>
                    Vote Now
                </button>
            </Link>

            <div style={{ marginTop: '2rem' }}>
                <Link to="/results" style={{ color: 'var(--secondary)', textDecoration: 'none' }}>
                    ➡️ View Results (Available Jan 25th 10am) ⬅️   © 2026 TN Vote Analysis [Arunkumar2003arun@gmail.com]
                </Link>
            </div>

        </div>
    );
};

export default Home;
