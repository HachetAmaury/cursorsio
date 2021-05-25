import React from 'react';
import StyledGlobalComponent from '../styles/StyledGlobalComponent';

function MyApp({ Component, pageProps }) {
    return (
        <StyledGlobalComponent>
            <Component {...pageProps} />
        </StyledGlobalComponent>
    );
}

export default MyApp;
