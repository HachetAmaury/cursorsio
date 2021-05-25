import React from 'react';
import styled from 'styled-components';

const StyledApp = styled.div`
    height: 100vh;
    display: grid;
    place-items: center;
`;

function App() {
    return (
        <StyledApp>
            <div>CursorsIo : Cursors & SocketIo</div>
        </StyledApp>
    );
}

export default App;
