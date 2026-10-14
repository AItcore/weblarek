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
console.log("Загруженные товары", catalog.getProducts());
console.log("Товар по ID",catalog.getProductByID("854cef69-976d-4c2a-a18c-2aa45046c390"));
catalog.saveProduct(apiProd.items[2]);
console.log("Выбранный товар",catalog.getProduct());

cart.addSelectedProduct(apiProd.items[1]);
cart.addSelectedProduct(apiProd.items[2]);
console.log("Добавленый товар в корзину",cart.getSelectedProducts());
console.log("Всего стоит",cart.getTotal(), "Количество",cart.getSelectedProductsAmount());
console.log("Есть ли в корзине товар",cart.checkSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.deleteSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67");
console.log("Есть ли в корзине товар после удаления",cart.checkSelectedProduct("b06cde61-912f-4663-9751-09956c0eed67"));
cart.clearShoppingCart();
console.log("Корзина после очистки",cart.getSelectedProducts());


console.log("Валидация данных перед вставкой данных",buyer.validate());
buyer.saveEmail("aa@exm.com");
buyer.savePhone("8912345");
buyer.saveAddress("sl 1");
buyer.savePaymentType("cash");
console.log("Вставленные данные: ", buyer.getData());
console.log("Валидация данных",buyer.validate());
buyer.clearBuyerData();
console.log("Вывод данных после очистки",buyer.getData());

console.log("Данные каталога: ",catalog.getProducts());
communication
  .getProducts()
  .then((data) => {
    catalog.saveProducts(data.items);
    console.log("Загруженные товары: ",catalog.getProducts());
  })
  .catch((error) => {
    console.error("Ошибка при получении товаров:", error);
  });
