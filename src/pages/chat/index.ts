import template from './chat.hbs';
import Block from '../../core/Block';
import store from '../../store/store';
import { validation } from '../../core/Validations';
import { content } from './content';
import { Router } from '../../core/Router';
import ToolTip, { TToolTip } from '../../components/tooltip';
import { userApi } from '../../api/UserApi';
import { chatsApi } from '../../api/ChatsApi';
import { letsSocket } from '../../api/websocket';
import { TUser } from '../../types/types';
import { TFVoid } from '../../types/void';


import './style.scss';
import { IMAGE_PRE_URL } from '../../api/config';

export type TCurrentChat = {
    id: number,
    name: string,
    avatarLink: string | null,
    messages: TMessage[]
}

type TLastMessage = {
    content: string
    id: number
    time: string
    user: TUser
}

export type TChat = {
    id: number,
    title: string,
    avatar: string | null,
    created_by: number,
    unread_count: number,
    last_message: null | TLastMessage,
    selected?: boolean
}

export interface TMessageApi {
    id: number,
    user_id: number,
    chat_id: number,
    type: 'message',
    time: string,
    content: string,
    is_read: boolean,
    file: null,
}

export interface TMessage extends TMessageApi {
    day?: string,
    date?: string,
    isMy: boolean,
    styles: Record<string, string>
}

type TSend = (message: string) => void

type TChatProps = {
    events?: Record<string, TFVoid>,
    chats: TChat[],
    currentChat: TCurrentChat,
    error: string | undefined,
    isDisabledFormMessage: boolean,
    toolTip: ToolTip
}

const chatPage = () => {
    const {
        errors,
        values,
        formState,
        init: validatorInit,
        onChangeValues
    } = validation();
    const router = new Router();

    let isOpenAddUserPopup = false;
    let isOpenRemoveUserPopup = false;
    let isOpenAddChatPopup = false;
    let isOpenChatUsersPopup = false;
    let isOpenAttachPopup = false;
    let chats: TChat[] = [];
    let send: null | TSend = null;
    let currentChat: TCurrentChat = {
        id: 0,
        name: '',
        avatarLink: null,
        messages: []
    };
    const message: TToolTip = {
        isDisplay: false,
        isSuccess: false,
        text: ''
    };


    function displayToolTip(isSuccess: boolean, text: string) {
        message.text = text;
        message.isSuccess = isSuccess;
        message.isDisplay = true;
        updateProps();
        setTimeout(() => {
            message.isDisplay = false;
            updateProps();
        }, 3000);
    }

    function onMessage(messages: TMessageApi[]) {
        if ( Array.isArray(messages) ) {
            currentChat = {
                ...currentChat,
                messages: convertMessages(messages.reverse())
            };
            updateProps();
        } else if ( typeof messages === 'object' ) {
            const arr = [...currentChat.messages, messages];
            currentChat = {
                ...currentChat,
                messages: convertMessages(arr)
            };
            updateProps();
        }
    }

    function updateChats() {
        chatsApi.getChats()
            .then(chatsData => {
                const chatsArr = chatsData.map((el: any): TChat => {
                    if ( el.last_message ) {
                        el.last_message.isMy = el.last_message.user.login === store.getState().user.login
                    }

                    if ( el.last_message && el.last_message.time.includes('T') && el.last_message.time.includes('+') ) {
                        const date = el.last_message.time.split('T')[0].replace(/-/gi, '.');
                        const time = el.last_message.time.split('T')[1].split('+')[0];
                        el.last_message.time = date + ' ' + time;
                    }
                    return el;
                });

                chats = chatsArr;
                beginChat(chatsArr[0].id);
                updateProps();
            })
            .catch(err => console.log('error--->', err));
    }

    (updateChats)();

    function beginChat(chatId: number) {
        chats = chats.map(item => {
            item.selected = item.id === chatId;
            if (item.selected) {
                currentChat = {
                    ...currentChat,
                    name: item.title,
                    avatarLink: item.last_message?.user?.avatar
                        ? `${IMAGE_PRE_URL}${item.last_message?.user?.avatar}`
                        : '',
                    id: chatId
                };
            }
            return item;
        })

        chatsApi.getChatToken(chatId)
            .then(data => {
                const userId = store.getState().user.id;
                const token = data.token;
                const socket = letsSocket(userId, chatId, token, onMessage);
                send = socket.send;
            })
            .catch(err => console.log('error--->', err));
    }

    function convertMessages(messages: TMessageApi[]): TMessage[] {
        const currentUserId = store.getState().user.id;
        const arr = messages.map((item: TMessage) => {
            if (item.time.includes('T') && item.time.includes('+')) {
                item.date = item.time.split('T')[0].replace(/-/gi,'.');
                item.time = item.time.split('T')[1].split('+')[0];
            }
            item.isMy = item.user_id === currentUserId;
            return item;
        });

        return arr.map((item: TMessage, i: number, arr: TMessage[]) => {
            if (i === 0) {
                item.day = item.date;
                return item;
            }
            if (item.date !== arr[i - 1].date) {
                item.day = item.date;
                return item;
            } else {
                return item;
            }
        });
    }

    class ChatPage extends Block<TChatProps> {
        constructor(props: TChatProps) {
            super(props, 'div', {
                class: 'inner',
            });
        }

        render() {
            return template({ ...this.props });
        }
    }

    function handleClick(event: any) {
        const addElem = event.path ? event.path.find((el: HTMLElement) => el.id ? el.id.includes('selectChat') : false) : false;
        const chatElem = event.target?.id ? event.target.id : false;
        const target = event.target as HTMLElement
        if (chatElem && target.id.includes('selectChat')) {
            const chatId = chatElem.split('_')[1];
            beginChat(Number(chatId));
        }
        if (addElem) {
            const chatId = addElem.id.split('_')[1];
            beginChat(Number(chatId));
        }
        if (target.id === 'link-profile') {
            event.preventDefault();
            router.go('/settings');
        } else if (target.id === 'addChat') {
            isOpenAddChatPopup = true;
            updateProps();
        } else if (target.id === 'popupOverlay') {
            isOpenAddUserPopup = false;
            isOpenRemoveUserPopup = false;
            isOpenAddChatPopup = false;
            updateProps();
        } else if (target.id === 'buttonOpenPopup') {
            isOpenChatUsersPopup = !isOpenChatUsersPopup;
            updateProps();
        } else if (target.id === 'buttonOpenAttachPopup') {
            isOpenAttachPopup = !isOpenAttachPopup;
            updateProps();
        }else if (target.id === 'addUser') {
            isOpenAddUserPopup = true;
            isOpenChatUsersPopup = false;
            updateProps();
        } else if (target.id === 'removeUser') {
            isOpenRemoveUserPopup = true;
            isOpenChatUsersPopup = false;
            updateProps();
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLElement;
        if (form.id === 'addUserForm') {
            const input = form.querySelector('input');
            if (input && input.value) {
                const login = input.value;
                userApi.searchUsersByLogin(login)
                    .then(users => {
                        const user = users.find((user: { login: string }) => user.login === login);
                        if (!user) displayToolTip(false, 'Пользователь не найден');
                        if (user && currentChat.id) {
                            chatsApi.addUserToChat(user.id, currentChat.id)
                                .then(res => {
                                    if (res === 'OK') {
                                        isOpenAddUserPopup = false;
                                        updateProps();
                                        displayToolTip(true, 'Пользователь успешно добавлен');
                                    }
                                })
                                .catch(err => console.log('error--->', err));
                        }
                    })
                    .catch(err => console.log('error--->', err));
            }
        } else if (form.id === 'removeUserForm') {
            const input = form.querySelector('input');
            if (input && input.value) {
                const login = input.value;
                userApi.searchUsersByLogin(login)
                    .then(users => {
                        const user = users.find((user: { login: string }) => user.login === login);
                        if (!user) displayToolTip(false, 'Пользователь не найден');
                        if (user && currentChat.id) {
                            chatsApi.deleteUserFromChat(user.id, currentChat.id)
                                .then(res => {
                                    if (res === 'OK') {
                                        isOpenRemoveUserPopup = false;
                                        updateProps();
                                        displayToolTip(true, 'Пользователь успешно удален');
                                    }
                                })
                                .catch(err => console.log('error--->', err));
                        }
                    })
                    .catch(err => console.log('error--->', err));
            }
        } else if (form.id === 'addChatForm') {
            const input = form.querySelector('input');
            if (input && input.value) {
                chatsApi.createChat(input.value)
                    .then(() => {
                        isOpenAddChatPopup = false;
                        updateChats();
                    })
                    .catch(err => console.log('error--->', err));
            }
        } else if (form.id === 'newMessage'){
            onChangeValues(form);

            if (!formState.disabled) {
                if (send && values.message) {
                    send(values.message);
                }
            } else {
                setTimeout(() => {
                    validatorInit({
                        message: ' '
                    });
                    updateProps();
                }, 2000);
            }
            updateProps();
        }
    }

    function updateProps() {
        page.setProps(
            content(
                errors,
                formState.disabled,
                chats,
                currentChat,
                isOpenAddUserPopup,
                isOpenRemoveUserPopup,
                isOpenAddChatPopup,
                isOpenChatUsersPopup,
                isOpenAttachPopup,
                message
            ),
        );
    }

    const page = new ChatPage({
        events: {
            submit: handleSubmit,
            click: handleClick,
        },
        ...content(
            errors,
            formState.disabled,
            chats,
            currentChat,
            isOpenAddUserPopup,
            isOpenRemoveUserPopup,
            isOpenAddChatPopup,
            isOpenChatUsersPopup,
            isOpenAttachPopup,
            message
        ),
    });

    return page;
}

export default chatPage;
