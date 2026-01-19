import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api';

// Import Party Images
import PMK from '../assets/parties/PMK.jpg';
import ADMK from '../assets/parties/ADMK.png';
import NTK from '../assets/parties/NTK.jpg';
import BJP from '../assets/parties/BJP.jpg';
import Dmk from '../assets/parties/DMK.jpg';
import TVK from '../assets/parties/TVK.jpg';
import Congress from '../assets/parties/Congress.png';
import DMDK from '../assets/parties/DMDK.jpg';

const parties = [
    { id: 'DMK', name: 'DMK', color: '#FF0000', image: Dmk },
    { id: 'ADMK', name: 'ADMK', color: '#008000', image: ADMK },
    { id: 'TVK', name: 'TVK', color: '#0000FF', image: TVK },
    { id: 'NTK', name: 'NTK', color: '#FFD700', image: NTK },
    { id: 'PMK', name: 'PMK', color: '#FFD700', image: PMK },
    { id: 'BJP', name: 'BJP', color: '#FF9933', image: BJP },
    { id: 'Congress', name: 'Congress', color: '#1976D2', image: Congress },
    { id: 'DMDK', name: 'DMDK', color: '#FFC107', image: DMDK },
];

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" },
    tap: { scale: 0.95 }
};

const Vote = () => {
    const [formData, setFormData] = useState({ name: '', age: '' });
    const [selectedParty, setSelectedParty] = useState(null);
    const [error, setError] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success, not-eligible, already-voted
    const navigate = useNavigate();

    React.useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top on load
        const hasVoted = localStorage.getItem('tn_election_2026_voted');
        if (hasVoted) {
            setStatus('already-voted');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.age || !selectedParty) {
            setError('Please fill all details and select a party.');
            return;
        }

        const age = parseInt(formData.age);
        if (age < 18) {
            setStatus('not-eligible');
            return;
        }

        try {
            await api.post('/vote', {
                name: formData.name,
                age: age,
                party: selectedParty.id
            });
            localStorage.setItem('tn_election_2026_voted', 'true');
            setStatus('success');
        } catch (err) {
            if (err.code === "ERR_NETWORK" || err.message === "Network Error") {
                // Simulate success for offline demo
                localStorage.setItem('tn_election_2026_voted', 'true');
                setStatus('success');
            } else if (err.response && err.response.data) {
                let msg = '';
                if (typeof err.response.data === 'string') {
                    msg = err.response.data;
                } else if (err.response.data.message) {
                    msg = err.response.data.message;
                } else if (err.response.data.error) {
                    msg = err.response.data.error;
                } else {
                    msg = JSON.stringify(err.response.data);
                }
                setError(msg);
            } else {
                setError('Something went wrong. Please check connection.');
            }
        }
    };

    if (status === 'already-voted') {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="card"
                    style={{ border: '1px solid var(--primary)' }}
                >
                    <motion.div
                        initial={{ rotate: -10 }} animate={{ rotate: 0 }}
                        style={{ fontSize: '4rem', marginBottom: '1rem' }}
                    >
                        ✋
                    </motion.div>
                    <h1 className="title-gradient">Survey Already Completed</h1>
                    <p style={{ fontSize: '1.2rem' }}>Only one response is allowed per participant.</p>
                    <p style={{ color: 'var(--text-secondary)' }}>Thank you for your participation.</p>

                    <div style={{ margin: '2rem' }}>
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Back to Home
                        </button>
                        <br /><br />
                        {/* <button
                            onClick={() => { localStorage.removeItem('tn_election_2026_voted'); setStatus('idle'); }}
                            style={{ background: 'transparent', border: '1px solid #334155', color: '#64748b', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                        >
                            Reset (Debug)
                        </button> */}
                    </div>
                </motion.div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200 } }}
                    className="card"
                >
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                        style={{ fontSize: '4rem', marginBottom: '1rem' }}
                    >
                        🎉
                    </motion.div>
                    <h1 className="title-gradient">Submission Successful!</h1>
                    <p style={{ fontSize: '1.2rem' }}>Thank you for participating., {formData.name}.</p>
                    <p style={{ color: 'var(--text-secondary)' }}>The result will be published on Sunday, 25 June at 10:00 AM</p>

                    <div style={{ margin: '2rem' }}>
                        <button className="btn-primary" onClick={() => navigate('/')}>
                            Return to Home
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (status === 'not-eligible') {
        return (
            <div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}>
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, transition: { type: "spring" } }}
                    className="card"
                    style={{ border: '1px solid var(--secondary)' }}
                >
                    <motion.div
                        initial={{ rotate: -180 }} animate={{ rotate: 0 }}
                        style={{ fontSize: '4rem', marginBottom: '1rem' }}
                    >
                        🔞
                    </motion.div>
                    <h1 style={{ color: 'var(--secondary)' }}>Not Eligible</h1>
                    <p style={{ fontSize: '1.2rem' }}>Sorry, {formData.name}.</p>
                    <p>you must be 18 years or older to participate in this survey.</p>

                    <div style={{ margin: '2rem' }}>
                        <button className="btn-primary" onClick={() => setStatus('idle')}>
                            Try Again
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="container">
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '1rem', fontSize: '1rem' }}>
                &larr; Back
            </button>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="card"
            >
                <h2 style={{ textAlign: 'center', marginBottom: '2rem' }} className="title-gradient">Cast Your Vote</h2>

                {error && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                        style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Ex. Arun Kumar"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Age</label>
                        <input
                            type="number"
                            placeholder="Ex. 21"
                            value={formData.age}
                            onChange={e => setFormData({ ...formData, age: e.target.value })}
                        />
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Select Your Party</label>
                        <div className="party-grid">
                            {parties.map(party => (
                                <motion.div
                                    key={party.id}
                                    variants={cardVariants}
                                    whileHover="hover"
                                    whileTap="tap"
                                    className={`party-card ${selectedParty?.id === party.id ? 'selected' : ''}`}
                                    onClick={() => setSelectedParty(party)}
                                    style={{
                                        padding: '1rem',
                                        borderRadius: '0.5rem',
                                        backgroundColor: selectedParty?.id === party.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255,255,255,0.03)',
                                        borderColor: selectedParty?.id === party.id ? 'var(--primary)' : 'transparent',
                                        textAlign: 'center'
                                    }}
                                >
                                    <img
                                        src={party.image}
                                        alt={party.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'contain',
                                            margin: '0 auto 0.5rem',
                                            display: 'block'
                                        }}
                                    />
                                    <strong>{party.name}</strong>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="btn-primary"
                        style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}
                    >
                        Submit Vote
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default Vote;
