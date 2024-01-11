import { use, expect } from 'chai';
import sinonChai from 'sinon-chai';
import { createSandbox, SinonStub } from 'sinon';
import { HTTPTransport } from './Api';

const testURL = 'https://ya-praktikum.tech/api/v2/test';

describe('Проверка HTTPTransport', () => {
    use(sinonChai);
    const sandbox = createSandbox();
    let http: HTTPTransport;
    let request: SinonStub;

    beforeEach(() => {
        http = new HTTPTransport();
        request = sandbox.stub(http, 'request' as keyof typeof http).callsFake(() => Promise.resolve())
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('Проверяем GET', () => {
        http.get(testURL);

        expect(request).to.have.been.calledWith(testURL, { method: 'GET' });
    });

    it('Проверяем POST', () => {
        http.post(testURL);

        expect(request).to.have.been.calledWith(testURL, { method: 'POST' });
    });

    it('Проверяем PUT', () => {
        http.put(`https://ya-praktikum.tech/api/v2/test`);

        expect(request).to.have.been.calledWith(testURL, { method: 'PUT' });
    });

    it('Проверяем DELETE', () => {
        http.delete(testURL);

        expect(request).to.have.been.calledWith(testURL, { method: 'DELETE' });
    });
});
