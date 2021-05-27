import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import next, { NextApiHandler } from 'next';
import * as socketio from 'socket.io';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler: NextApiHandler = nextApp.getRequestHandler();

const sockets = new Map();

nextApp.prepare().then(async () => {
  const app: Express = express();
  const server: http.Server = http.createServer(app);
  const io: socketio.Server = new socketio.Server();
  io.attach(server);

  app.get('/hello', async (_: Request, res: Response) => {
    res.send('Hello World');
  });

  io.on('connection', (socket: socketio.Socket) => {
    !sockets.get(socket.id) && sockets.set(socket.id, { id: socket.id });

    io.sockets.emit('datas', {
      data: Array.from(sockets),
      time: Date.now(),
    });

    socket.on('disconnect', () => {
      console.log('client disconnected');
      sockets.delete(socket.id);
      console.log(sockets);

      socket.broadcast.emit('datas', {
        data: Array.from(sockets),
        time: Date.now(),
      });
    });

    socket.on('MOUSE_POSITION_CHANGED', position => {
      sockets.set(socket.id, { ...sockets.get(socket.id), position });

      io.sockets.emit('datas', {
        data: Array.from(sockets),
        time: Date.now(),
      });
    });

    socket.on('message', message => {
      sockets.set(socket.id, { ...sockets.get(socket.id), message });

      io.sockets.emit('datas', {
        data: Array.from(sockets),
        time: Date.now(),
      });
    });
  });

  app.all('*', (req: any, res: any) => nextHandler(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
