import "./scss/styles.scss";
import { ProductCatalog } from "./components/models/ProductCatalog";
import { ShoppingCart } from "./components/models/ShoppingCart";
import { Buyer } from "./components/models/Buyer";
import { ServerApi } from "./components/communication/ServerApi";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Api } from "./components/base/Api";

const cart = new ShoppingCart();
const buyer = new Buyer();
const catalog = new ProductCatalog();
const api = new Api(API_URL);
const communication = new ServerApi(api);

const apiProd = apiProducts;

catalog.saveProducts(apiProd.items);
console.log(catalog.getProducts());
console.log(catalog.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
catalog.saveProduct(apiProd.items[2]);
console.log(catalog.getProduct());

cart.addSelectedProduct(apiProd.items[1]);
console.log(cart.getSelectedProducts());
cart.addSelectedProduct(apiProd.items[2]);
console.log(cart.getTotal(), cart.getSelectedProductsAmount());
console.log(cart.checkSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.deleteSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67");
console.log(cart.checkSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.clearShoppingCart();
console.log(cart.getSelectedProducts());

buyer.saveEmail("aa@exm.com");
console.log(buyer.getData());
buyer.savePhone("8912345");
console.log(buyer.validate());
console.log(buyer.getData());

console.log(communication.getProducts());
communication.getProducts().then((data) => catalog.saveProducts(data.items));
console.log(catalog.getProducts());
