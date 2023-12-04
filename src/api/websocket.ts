import { TMessageApi } from '../pages/chat';

export function letsSocket(
    userId: number,
    chatId: number,
    token: string,
    onMessage: (messages: TMessageApi[]) => void,
) {

    const socket = new WebSocket(
        `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
    );

    let interval: NodeJS.Timer | null = null;

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data)
        if ( data.type === 'message' || Array.isArray(data) ) {
            onMessage(data);
        }
    });

    socket.addEventListener('error', (event: any) => {
        console.log('Ошибка', event.message);
    });

    const send = (message: string) => {
        socket.send(JSON.stringify({
            content: message,
            type: 'message',
        }));
    };

    socket.addEventListener('open', () => {
        socket.send(
            JSON.stringify({
                content: 0,
                type: 'get old'
            })
        );

        interval = setInterval(() => {
            socket.send(
                JSON.stringify({
                    type: 'ping',
                })
            );
        }, 50000);
    });

    socket.addEventListener('close', (event) => {
        if ( event.wasClean ) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
        if ( interval ) {
            clearInterval(interval);
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    return { send };
}
