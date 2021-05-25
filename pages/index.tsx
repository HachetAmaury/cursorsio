import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  StyledHomeComponent,
  StyledMainComponent,
  StyledFooterComponent,
} from '../styles/StyledHomeComponent';

import { io } from 'socket.io-client';

export default function Home() {
  const [datas, setDatas] = useState(new Array());
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketTemp = io();

    socketTemp.on('connect', () => {
      console.log('connect');
    });

    socketTemp.on('datas', data => {
      console.log(data);

      setDatas(data.data);
    });

    socketTemp.on('disconnect', () => {
      console.log('disconnect');
    });

    setSocket(socketTemp);

    return () => {
      socket && socket.close();
    };
  }, []);

  console.log(socket);

  useEffect(() => {
    socket && socket.emit('message', message);
  }, [message]);

  return (
    <StyledHomeComponent>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledMainComponent>
        <div>CursorsIo : Cursors & SocketIo</div>
        <input
          type="text"
          name="message"
          id="message"
          value={message}
          onChange={event => {
            setMessage(event.target.value);
          }}
        />
        <button
          onClick={() => {
            socket.emit('message', 'hello');
          }}
        >
          HELLO
        </button>
        <div>
          {datas &&
            datas?.map(element => (
              <div key={element[0]}>{JSON.stringify(element)}</div>
            ))}
        </div>
      </StyledMainComponent>

      <StyledFooterComponent></StyledFooterComponent>
    </StyledHomeComponent>
  );
}
