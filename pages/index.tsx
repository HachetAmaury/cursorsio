import Head from 'next/head';
import React from 'react';
import {
    StyledHomeComponent,
    StyledMainComponent,
    StyledFooterComponent,
} from '../styles/StyledHomeComponent';

export default function Home() {
    return (
        <StyledHomeComponent>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <StyledMainComponent>
                CursorsIo : Cursors & SocketIo
            </StyledMainComponent>

            <StyledFooterComponent></StyledFooterComponent>
        </StyledHomeComponent>
    );
}
