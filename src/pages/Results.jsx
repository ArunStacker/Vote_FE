import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api';

const Results = () => {
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        api.get('/results')
            .then(res => {
                setResults(res.data);
                calculateWinner(res.data);
            })
            .catch(err => {
                if (err.response && err.response.status === 403) {
                    setError(err.response.data); // "Results will be published on Sunday..."
                } else {
                    setError('Could not fetch results.Result will be published on Sunday,25 June at 10:00 AM');
                }
            });
    }, []);

    const calculateWinner = (data) => {
        if (!data) return;
        let maxVotes = -1;
        let winParty = '';
        Object.entries(data).forEach(([party, count]) => {
            if (count > maxVotes) {
                maxVotes = count;
                winParty = party;
            }
        });
        setWinner(winParty);
    };

    if (error) {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '20vh' }}>
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="card">
                    <h1 style={{ color: 'var(--secondary)' }}>Results Locked 🔒</h1>
                    <p style={{ fontSize: '1.2rem' }}>{error}</p>
                    <Link to="/">
                        <button className="btn-primary" style={{ marginTop: '1rem' }}>Back to Home</button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (!results) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <h1 className="title-gradient" style={{ textAlign: 'center' }}>Survey Results 2026</h1>

            {winner && (
                <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="card"
                    style={{ textAlign: 'center', marginBottom: '2rem', border: '2px solid var(--primary)' }}
                >
                    <h2>🎉 Highest Survey Response 🎉</h2>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>
                        {winner}
                    </div>
                    <p>Tamil Nadu 2026: Public Opinion Survey Analysis</p>
                </motion.div>
            )}

            <div className="card">
                {Object.entries(results).map(([party, count]) => {
                    const totalVotes = Object.values(results).reduce((a, b) => a + b, 0) || 1;
                    const percentage = ((count / totalVotes) * 100).toFixed(1);
                    return (
                        <div key={party} style={{ marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                <span>{party}</span>
                                <strong>{percentage}%</strong>
                            </div>
                            <div style={{ background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    style={{ height: '100%', background: 'var(--primary)' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <Link to="/">
                    <button className="btn-primary">Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Results;
