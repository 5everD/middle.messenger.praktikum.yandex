import { expect } from 'chai';
import { Router } from './Router';
import { JSDOM } from 'jsdom';
import Block from './Block';

describe('Проверяем переходы у Роута', () => {
    const getRouterTest = () => {
        const router = new Router('#main')
        router
            .use('/testPathOne', { getContent: () => '' } as unknown as Block<Record<string, unknown>>)
            .use('/testPathTwo', { getContent: () => '' } as unknown as Block<Record<string, unknown>>)
            .start();
        return router;
    }

    beforeEach(() => {
        const dom = new JSDOM(
            '<!DOCTYPE html><body><main id="main"></main></body>',
            { url: 'http://localhost:3000' }
        );

        (global as any).window = dom.window;
        global.document = dom.window.document;
    })

    it('После добавлении нового Роута, его можно найти ', () => {
        const router = getRouterTest();
        expect(router.getRoute('/testPathTwo')).not.to.be.undefined;
    });

    it('Переход на новую страницу должен менять состояние сущности history', () => {
        const router = getRouterTest();

        router.go('/testPathOne');
        router.go('/testPathTwo');

        expect(router.history.length).to.eq(3);
    });
});
