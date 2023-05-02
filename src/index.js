import main from './pages/main/main.hbs';

window.addEventListener('load', () => {
    const rootNode = document.getElementById('root');
    console.log(main)
    rootNode.innerHTML = main({});
})