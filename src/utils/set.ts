type Indexed<T = unknown> = {
    [key in string]: T;
};

function merge<T>(lhs: Indexed<T>, rhs: Indexed<T>): Indexed<T> {
    for (const p in rhs) {
        if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
            continue;
        }

        try {
            if (rhs[p] !== null && typeof rhs[p] === 'object') {
                rhs[p] = merge(lhs[p] as Indexed<T>, rhs[p] as Indexed<T>) as T;
            } else {
                lhs[p] = rhs[p];
            }
        } catch (e) {
            lhs[p] = rhs[p];
        }
    }

    return lhs;
}

function set<T extends Indexed<T>>(
    object: T | unknown,
    path: string,
    value: unknown
): T | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be a string');
    }

    const result = path.split('.').reduceRight<Indexed<T>>(
        (acc, key) => {
            return { [key]: acc } as Indexed<T>;
        },
        value as T
    );
    return merge(object as Indexed<T>, result) as T;
}

export default set;
