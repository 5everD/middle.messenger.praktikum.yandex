export type TMassages = {
    name: string
    text: string
    time: string
    count?: number
    my?: boolean
    selected?: boolean
}

export type TMassage = {
    day?: string
    time: string
    text: string
    attach?: string
    my?: boolean
    read?: boolean
}

export const massages: TMassages[] = [
    {
        name: 'Андрей', text: 'Изображение', time: '10:49', count: 2,
    },
    {
        name: 'Киноклуб', text: 'Стикер', time: '12:00', my: true,
    },
    {
        name: 'Илья', text: 'Друзья, у меня для вас особенный выпуск новостей! бла бла бла', time: '15:12', count: 4,
    },
    {
        name: 'Вадим', text: 'Круто', time: 'Пт', my: true, selected: true,
    },
    { name: 'тет-а-теты', text: 'И Human Interface Guidelines и Material Design рекомендуют бла бла бла', time: 'Ср' },
    { name: '1, 2, 3', text: 'Миллионы россиян ежедневно проводят десятки часов своего бла бла бла', time: 'Пн' },
    { name: 'Design Destroyer', text: 'В 2008 году художник Jon Rafman начал собирать блаблабла', time: 'Пн' },
    { name: 'Day.', text: 'Так увлекся работой по курсу, что совсем забыл его анонсировать бла бла бла', time: '1 Мая 2020' },
    { name: 'Стас Рогозин', text: 'Можно или сегодня или завтра бла бла бла бла бла бла бла бла бла', time: '12 Апр 2020' },
    { name: 'тет-а-теты', text: 'И Human Interface Guidelines и Material Design рекомендуют бла бла бла', time: 'Ср' },
    { name: '1, 2, 3', text: 'Миллионы россиян ежедневно проводят десятки часов своего бла бла бла', time: 'Пн' },
    { name: 'Design Destroyer', text: 'В 2008 году художник Jon Rafman начал собирать блаблабла', time: 'Пн' },
    { name: 'Day.', text: 'Так увлекся работой по курсу, что совсем забыл его анонсировать бла бла бла', time: '1 Мая 2020' },
    { name: 'Стас Рогозин', text: 'Можно или сегодня или завтра бла бла бла бла бла бла бла бла бла', time: '12 Апр 2020' },
    { name: 'тет-а-теты', text: 'И Human Interface Guidelines и Material Design рекомендуют бла бла бла', time: 'Ср' },
    { name: '1, 2, 3', text: 'Миллионы россиян ежедневно проводят десятки часов своего бла бла бла', time: 'Пн' },
    { name: 'Design Destroyer', text: 'В 2008 году художник Jon Rafman начал собирать блаблабла', time: 'Пн' },
    { name: 'Day.', text: 'Так увлекся работой по курсу, что совсем забыл его анонсировать бла бла бла', time: '1 Мая 2020' },
    { name: 'Стас Рогозин', text: 'Можно или сегодня или завтра бла бла бла бла бла бла бла бла бла', time: '12 Апр 2020' },
];

export const massage: TMassage[] = [
    {
        day: '19 июня',
        time: '11:56',
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА '
            + 'в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты '
            + 'летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как '
            + 'астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло '
            + 'нетак и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на '
            + 'аукционе за 45000 евро.',
    },
    { time: '11:56', text: '', attach: 'https://downloader.disk.yandex.ru/preview/f687004444b89178528f6584a74ae479e75e0dbde4b647f70fe854d9b6fe9111/647d75a7/nGh8rPVMlTlTKepP1cqjSJZb79Sd0D4-UTKFdrl2H0n_VOnVNiVcB4-5NxSWK8ZSNyh1XZjxfqbRGHnJYHEAug%3D%3D?uid=0&filename=scale_1200.webp&disposition=inline&hash=&limit=0&content_type=image%2Fjpeg&owner_uid=0&tknv=v2&size=2048x2048' },
    {
        time: '12:00', text: 'Круто!', my: true, read: true,
    },
];

export const name: string = 'Вадим';