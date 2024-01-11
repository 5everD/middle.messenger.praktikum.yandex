import template from './profile.hbs';
import Block from '../../core/Block';
import Link from '../../components/link';
import Input from '../../components/input';
import Title from '../../components/title';
import Avatar from '../../components/avatar';
import Button from '../../components/button';
import store, { StoreEvents } from '../../store/store';
import { validation } from '../../core/Validations';
import { content } from './content';
import { Router } from '../../core/Router';
import { authApi } from '../../api/AuthApi';
import { userApi, TUserValues } from '../../api/UserApi';
import { TUser } from '../../types/types';
import Popup from '../../components/popup';

import './style.scss';

export type TProps = {
    events?: Record<string, (event: Event) => void>,
    avatar: Avatar,
    title: Title,
    inputEmail: Input,
    inputLogin: Input,
    inputFirst: Input,
    inputSecond: Input,
    inputDisplayName: Input,
    inputPhone: Input,
    linkChangeData: Link,
    linkChangePass: Link,
    button: Button,
    linkExit: Link,
    popup: Popup,
}

const profilePage = (edit = false, isOpenChangeAvatarPopup = false) => {
    const { errors, values, init: initValidator, formState, onChangeValues } = validation();
    const router = new Router();

    class Profile extends Block<TProps> {
        constructor(props: TProps) {
            super(props, 'div', {
                class: 'inner',
            });
        }

        render() {
            return template({ ...this.props });
        }
    }

    store.on(StoreEvents.Updated, handleStoreUpdate);

    function handleStoreUpdate() {
        const initValues: any = store.getState().user;
        initValidator(initValues);
        updateProps();
    }

    authApi.getUser()
        .then((res: TUser) => {
            store.set('user', res)
        })
        .catch(err => console.log('error--->', err));

    function handleChange(event: Event) {
        const target = event.target as HTMLElement;
        if (target.className === 'btn-back') {
            router.go('/messenger');
        } else if (target.className === 'link edit') {
            event.preventDefault();
            edit = true;
            updateProps();
        } else if (target.className === 'link change-pass') {
            event.preventDefault();
            router.go('/change-password');
        } else if(target.className === 'link logout') {
            event.preventDefault();
            authApi.logout()
                .then((res: string) => {
                    if (res === 'OK') {
                        router.go('/');
                    }
                })
                .catch(err => console.log('error--->', err))
        } else if (target.id === 'profile__overlay') {
            isOpenChangeAvatarPopup = true;
            updateProps();

        } else if (target.id === 'popupOverlay') {
            isOpenChangeAvatarPopup = false;
            updateProps();
        }
    }

    function handleSubmit(event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;

        console.log(form)

        if (form.className === 'avatar__form') {
            const avatarInput: HTMLInputElement | null  = form.querySelector('#avatar');
            console.log(avatarInput)
            if (avatarInput !== null && avatarInput.files?.length) {
                userApi.changeAvatar(form)
                    .then(newProfileData => {
                        store.set('user', newProfileData)
                        isOpenChangeAvatarPopup = false;
                        updateProps();
                    })
                    .catch(err => console.log('error--->', err));
            }
        } else if (form.className === 'profile__form') {
            onChangeValues(form);

            if (!formState.disabled) {
                userApi.changeUserProfile(values as TUserValues)
                    .then(newProfileData => {
                        store.set('user', newProfileData)
                        edit = false;
                        updateProps();
                    })
                    .catch(err => console.log('error--->', err));
            }
        }
    }

    function handleBlurOrFocus(event: Event) {
        const input = event.target as HTMLElement;
        onChangeValues(input);
        updateProps();
    }

    function updateProps() {
        page.setProps(
            content(errors, values, edit, formState.disabled, isOpenChangeAvatarPopup),
        );
    }

    const page = new Profile({
        events: {
            submit: handleSubmit,
            blur: handleBlurOrFocus,
            focus: handleBlurOrFocus,
            click: handleChange,
        },
        ...content(errors, values, edit, formState.disabled, isOpenChangeAvatarPopup),
    });

    return page;
};

export default profilePage;
