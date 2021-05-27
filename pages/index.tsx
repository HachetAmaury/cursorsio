import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import {
  StyledMainComponent,
  StyledFooterComponent,
} from '../styles/StyledHomeComponent';

import { io } from 'socket.io-client';
import styled from 'styled-components';

const RANGE_BETWEEN_MOUSE_POISTION_UPDATES = 0;

const StyledHomeComponent = styled.div`
  min-height: 100vh;
  position: relative;
`;

export default function Home() {
  const [datas, setDatas] = useState(new Array());
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketTemp = io();

    socketTemp.on('connect', () => {
      console.log('connect');
    });

    socketTemp.on('datas', ({ data }) => {
      console.log(data);

      setDatas(data);
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

  const [mouseY, setMouseY] = useState(null);
  const [mouseX, setMouseX] = useState(null);

  const [lastMousePositionUpdateTime, setLastMousePositionUpdateTime] =
    useState(null);

  useEffect(() => {
    setLastMousePositionUpdateTime(Date.now());
  }, []);

  console.log(`[${mouseX},${mouseY}]`);

  return (
    <StyledHomeComponent
      onMouseMove={e => {
        if (
          Date.now() - lastMousePositionUpdateTime >
          RANGE_BETWEEN_MOUSE_POISTION_UPDATES
        ) {
          setLastMousePositionUpdateTime(Date.now());
          setMouseY(e.clientY);
          setMouseX(e.clientX);
          socket &&
            socket.emit('MOUSE_POSITION_CHANGED', {
              x: mouseX,
              y: mouseY,
            });
        }
      }}
    >
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
            datas?.map(element => {
              console.log(element);

              const [key, value] = element;

              if (key === socket.id) return;

              return (
                <div
                  style={{
                    position: 'absolute',
                    top: value?.position?.y,
                    left: value?.position?.x,
                    height: '30px',
                    width: '30px',
                  }}
                  key={key}
                >
                  {value?.message}
                </div>
              );
            })}
        </div>
      </StyledMainComponent>
    </StyledHomeComponent>
  );
}
