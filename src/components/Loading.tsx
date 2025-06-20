import React from 'react';

const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    border: '4px solid #ccc',
    borderTop: '4px solid #007bff',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto',
};

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '150px',
};

const messageStyle: React.CSSProperties = {
    marginTop: '16px',
    fontSize: '1.1rem',
    color: '#555',
};

const spinnerKeyframes = `
@keyframes spin {
    to { transform: rotate(360deg); }
}
`;

const Loading: React.FC = () => (
    <div style={containerStyle} className='loading-container flex flex-col items-center justify-center h-full'>
        <style>{spinnerKeyframes}</style>
        <div style={spinnerStyle} />
        <div style={messageStyle}>Loading content, please wait...</div>
    </div>
);

export default Loading;