import { TChat, TCurrentChat } from ".";
import Popup from "../../components/popup";
import chatPopup from "./chatPopup";
import Button from "../../components/button";
import Input from "../../components/input";
import Link from '../../components/link';
import ToolTip, { TToolTip } from "../../components/tooltip";
import Title from "../../components/title";

type TData = {
    message?: string | undefined
}

export const content = (
    errors: TData,
    isDisabledFormMessage: boolean,
    chats: TChat[],
    currentChat: TCurrentChat,
    isOpenAddUserPopup: boolean,
    isOpenRemoveUserPopup: boolean,
    isOpenAddChatPopup: boolean,
    isOpenChatUsersPopup: boolean,
    isOpenAttachPopup: boolean,
    message: TToolTip,
) => ({
    link: new Link({
        href: '/settings',
        text: 'Профиль',
    }).render(),
    toolTip: new ToolTip(message).render(),
    img_url: `https://ya-praktikum.tech/api/v2/resources/`,
    chats: chats,
    currentChat: currentChat,
    isOpenChatUsersPopup: isOpenChatUsersPopup,
    error: errors.message,
    isDisabledFormMessage: isDisabledFormMessage,
    isOpenAttachPopup: isOpenAttachPopup,
    popupAddUser: new Popup({
        isOpen: isOpenAddUserPopup,
        content: new chatPopup({
            title:new Title({
                title: 'Добавить пользователя',
                class: 'addUser'
            }).render(),
            formId: "addUserForm",
            input: new Input({
                class: 'addUser',
                name: "login",
                label: "Логин",
                value: "",
                errorText: '',
                type: "text",
            }).render(),
            button: new Button({
                text: "Добавить",
                disabled: false
            }).render()
        }).render()
    }).render(),
    popupRemoveUser: new Popup({
        isOpen: isOpenRemoveUserPopup,
        content: new chatPopup({
            title:new Title({
                title: 'Удалить пользователя',
                class: 'removeUser'
            }).render(),
            formId: "removeUserForm",
            input: new Input({
                class: 'removeUser',
                name: "login",
                label: "Логин",
                value: "",
                errorText: '',
                type: "text",
            }).render(),
            button: new Button({
                text: "Удалить",
                disabled: false
            }).render()
        }).render()
    }).render(),
    popupAddChat: new Popup({
        isOpen: isOpenAddChatPopup,
        content: new chatPopup({
            title:new Title({
                title: 'Создать чат',
                class: 'addChat'
            }).render(),
            formId: "addChatForm",
            input: new Input({
                class: 'addChat',
                name: "title",
                label: "Название чата",
                value: "",
                errorText: '',
                type: "text",
            }).render(),
            button: new Button({
                text: "Создать",
                disabled: false
            }).render()
        }).render()
    }).render()
});
