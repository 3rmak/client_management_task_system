import React from 'react';

export const LoadingComponent = () => {
    return (
        <div className='container mt-2'>
            <div className="spinner-border text-warning row align-items-center" role="status">
                <span className="visually-hidden align-self-center">Loading...</span>
            </div>
        </div>
    );
};
