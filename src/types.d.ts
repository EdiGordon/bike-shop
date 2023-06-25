type ProductPorps = {
    name: string;
    price: number;
    type: string;
    image: any;
    find?: any;
}

type CartProps = {
    cart?: Array;
    total: number;
}

type AddTodCartProps = (product: ProductPorps) => void;

type ActionDispatchProps = {
    action: string;
    state: ProductPorps
}

type actionProps = {
    payload: object;
    type: string;
}