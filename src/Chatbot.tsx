import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot: React.FC = () => {
    const [department, setDepartment] = useState('Marketing');
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([
        'New Chat',
        'What is marketing',
        'Give me a list of...'
    ]);
    const [editingIdx, setEditingIdx] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState('');

    const placeholder =
        department === 'Sales'
            ? 'Enter your sales query here...'
            : 'Enter your marketing query here...';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            setHistory([input, ...history]);
            setInput('');
        }
    };

    const handleEdit = (idx: number, value: string) => {
        setEditingIdx(idx);
        setEditingValue(value);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingValue(e.target.value);
    };

    const handleEditSave = (idx: number) => {
        if (editingValue.trim()) {
            setHistory(history.map((item, i) => (i === idx ? editingValue : item)));
        }
        setEditingIdx(null);
        setEditingValue('');
    };

    const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (e.key === 'Enter') {
            handleEditSave(idx);
        } else if (e.key === 'Escape') {
            setEditingIdx(null);
            setEditingValue('');
        }
    };

    const handleDelete = (idx: number) => {
        setHistory(history.filter((_, i) => i !== idx));
        if (editingIdx === idx) {
            setEditingIdx(null);
            setEditingValue('');
        }
    };

    return (
        <div className="chatbot-root">
            {/* Full-width Navbar */}
            <nav className="chatbot-navbar">
                <div className="chatbot-navbar-left">
                    <div className="chatbot-logo-box">
                        <img src="/logo192.png" alt="Aiworksquad" className="chatbot-logo" />
                        <span className="chatbot-logo-text">Aiworksquad</span>
                    </div>
                </div>
                <div className="chatbot-navbar-right">
                    <div className="chatbot-department-box">
                        <label htmlFor="department-select" className="chatbot-department-label">Department:</label>
                        <select
                            id="department-select"
                            value={department}
                            onChange={e => setDepartment(e.target.value)}
                            className="chatbot-department-select"
                        >
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                        </select>
                    </div>
                    <div className="chatbot-user-box">
                        <span className="chatbot-user-icon">👤</span> Mayank
                    </div>
                </div>
            </nav>
            <div className="chatbot-content">
                {/* Sidebar */}
                <aside className="chatbot-sidebar">
                    <div className="chatbot-newchat-btn-box">
                        <button className="chatbot-newchat-btn">+ New Chat</button>
                    </div>
                    <div className="chatbot-history-section">
                        <div className="chatbot-history-title">
                            <span className="chatbot-history-clock">&#8635;</span> History
                        </div>
                        <div className="chatbot-history-list">
                            {history.map((item, idx) => (
                                <div key={idx} className="chatbot-history-item">
                                    <span className="chatbot-history-chat-icon">&#128172;</span>
                                    {editingIdx === idx ? (
                                        <input
                                            className="chatbot-history-edit-input"
                                            value={editingValue}
                                            autoFocus
                                            onChange={handleEditChange}
                                            onBlur={() => handleEditSave(idx)}
                                            onKeyDown={e => handleEditKeyDown(e, idx)}
                                        />
                                    ) : (
                                        <span className="chatbot-history-text">{item}</span>
                                    )}
                                    <span
                                        className="chatbot-history-edit-icon"
                                        title="Edit"
                                        onClick={() => handleEdit(idx, item)}
                                    >
                                        &#9998;
                                    </span>
                                    <span
                                        className="chatbot-history-delete-icon"
                                        title="Delete"
                                        onClick={() => handleDelete(idx)}
                                    >
                                        &#128465;
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="chatbot-sidebar-links">
                            <div className="chatbot-sidebar-link"><span>⚡</span> Upgrade to Plus</div>
                            <div className="chatbot-sidebar-link"><span>❓</span> Updates & FAQ</div>
                            <div className="chatbot-sidebar-link"><span>📄</span> Terms and Conditions</div>
                            <div className="chatbot-sidebar-link"><span>🔒</span> Privacy Policy Page</div>
                        </div>
                    </div>
                </aside>
                {/* Main Chat Area */}
                <div className="chatbot-main">
                    <div className="chatbot-intro-box">
                        <b>Introduce yourself to AIWorkSquad</b>
                        <div className="chatbot-intro-desc">Im Mayank. CEO of an IT startup company in India <span className="chatbot-edit-icon">✏️</span></div>
                    </div>
                    <form className="chatbot-input-form" onSubmit={handleSubmit}>
                        <input style={{color: '#222'}}
                            type="text"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            placeholder={placeholder}
                            className="chatbot-input"
                        />
                        <button type="submit" className="chatbot-send-btn">
                            <span>➤</span>
                        </button>
                    </form>
                    <div className="chatbot-hint">Type your next question above or select one from the related questions section</div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot; 