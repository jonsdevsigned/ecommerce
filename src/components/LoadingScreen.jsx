import React from 'react';
import '../styles/loadingScreen.css'
import { Spinner, Button } from 'react-bootstrap'

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Button variant="info" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
            </Button>
        </div>
    );
};

export default LoadingScreen;