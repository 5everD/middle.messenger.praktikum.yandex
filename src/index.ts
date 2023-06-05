import main from './pages/main';
import authPage from './pages/auth';
import changePWD from './pages/changepwd';
import chatPage from './pages/chat';
import profilePage from './pages/profile';
import registrationPage from './pages/registration';
import render from './core/render';
import { page404, page500 } from './pages/errors/error';

window.addEventListener('DOMContentLoaded', () => {
    render('#root', main);

    switch (window.location.pathname) {
    case '/':
        render('#root', main);
        break;
    case '/auth':
        render('#root', authPage());
        break;
    case '/registration':
        render('#root', registrationPage());
        break;
    case '/profile':
        render('#root', profilePage());
        break;
    case '/change-password':
        render('#root', changePWD());
        break;
    case '/chat':
        render('#root', chatPage());
        break;
    case '/404':
        render('#root', page404);
        break;
    case '/500':
        render('#root', page500);
        break;
    default:
        break;
    }
});
