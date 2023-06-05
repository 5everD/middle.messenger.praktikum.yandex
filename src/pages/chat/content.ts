import { TMassages, TMassage } from './data';
import Link from '../../components/link';

type TData = {
    message?: string | undefined
}

export const content = ( // TODO
    errors: TData,
    name: string,
    massage: TMassage[],
    massages: TMassages[],
) => ({
    name,
    massage,
    massages,
    error: errors.message,
    link: new Link({
        href: '/profile',
        text: 'Профиль',
    }).render(),
});
