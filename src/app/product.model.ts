 export interface IAttribute {
    Material?: String,
    Color?: String,
    Brand?: String
}
export class Attribute implements IAttribute {
    constructor(
        public Material?: string,
        public Color?: string,
        public Brand?: string,
    ) {
    }
}
export interface IProduct {
    id?: string,
    image?: string,
    minOrders?: string,
    deliveryTime?: string,
    location?: string,
    productRating?: string,
    productPrice?: string
    attributes?: Attribute
}

export class Product implements IProduct {
    constructor(
        public id?: string,
        public image?: string,
        public minOrders?: string,
        public deliveryTime?: string,
        public imlocationage?: string,
        public productRating?: string,
        public productPrice?: string,
        public attributes?: Attribute,
    ) {
        this.attributes= new Attribute()
    }
}