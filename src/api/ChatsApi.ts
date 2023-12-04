import { BACKEND_URL } from './config';
import { handleResponse, HTTPTransport } from './Api';
import { TOptionsAPI } from './routerTypes';

class ChatsApi extends HTTPTransport {
    private _baseUrl: string;
    private _headers: {
        'Accept': string
        'Content-Type': string
    };

    constructor({ baseUrl, headers }: TOptionsAPI) {
        super();
        this._baseUrl = baseUrl
        this._headers = headers
    }

    getChats() {
        return this.get(
            `${this._baseUrl}/api/v2/chats`,
            {
                headers: this._headers,
            }
        ).then(handleResponse);
    }

    createChat(title: string) {
        return this.post(
            `${this._baseUrl}/api/v2/chats`,
            {
                headers: this._headers,
                data: { title }
            }
        ).then(handleResponse);
    }

    getChatToken(chatId: number) {
        return this.post(
            `${this._baseUrl}/api/v2/chats/token/${chatId}`,
            {
                headers: this._headers,
            }
        ).then(handleResponse);
    }

    addUserToChat(userId: number, chatId: number) {
        return this.put(
            `${this._baseUrl}/api/v2/chats/users`,
            {
                headers: this._headers,
                data: {
                    users: [ userId ],
                    chatId: chatId
                }
            }
        ).then(handleResponse);
    }

    deleteUserFromChat(userId: number, chatId: number) {
        return this.delete(
            `${this._baseUrl}/api/v2/chats/users`,
            {
                headers: this._headers,
                data: {
                    users: [ userId ],
                    chatId: chatId
                }
            }
        ).then(handleResponse);
    }
}

export const chatsApi = new ChatsApi({
    baseUrl: BACKEND_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
});
