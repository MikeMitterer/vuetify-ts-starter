export function isArticle(arg: any): arg is Article {
    return arg
        && arg.id
        && typeof (arg.id) === 'string'
        && arg.description && typeof (arg.description) === 'string'
        && arg.price && typeof (arg.price) === 'number'
        && arg.id.length > 0
        && arg.description.length > 0
}

export interface Article {
    id: string
    description: string
    price: number
}

export function newArticle(
    { id  = '', description = '', price = 0}: { id?: string, description?: string, price?: number } = {}): Article {

    return {
        id,
        description,
        price
    }
}
