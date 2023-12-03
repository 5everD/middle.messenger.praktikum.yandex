import authPage from './pages/auth';
import changePWD from './pages/changepwd';
import chatPage from './pages/chat';
import profilePage from './pages/profile';
import registrationPage from './pages/registration';
import { page404, page500 } from './pages/errors/error';
import { Router } from './core/Router';


const router = new Router('#root');
router
    .use('/messenger', chatPage())
    .use('/', authPage())
    .use('/sign-up', registrationPage())
    .use('/settings', profilePage())
    .use('/change-password', changePWD())
    .use('/500', page500)
    .use('*', page404)
    .start();
