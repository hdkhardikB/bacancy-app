import { Category } from "./Category";

export class Product {
    public ID: number;
    public product_name: string;
    public category_id: number;
    public description: string;
    public m_price: number;
    public s_price: number;
    public thumbnail: string;
    public category: Category;
}

