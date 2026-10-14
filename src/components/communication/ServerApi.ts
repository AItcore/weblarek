import {
  IApi,
  IOrderRequest,
  TOrderResponse,
  IOrderResultApi,
} from "../../types/index";

export class ServerApi {
  protected api: IApi;

  constructor(api: IApi) {
    this.api = api;
  }

  async getProducts(): Promise<IOrderResultApi> {
    return this.api.get<IOrderResultApi>("/product/");
  }

  async postOrder(orderRequest: IOrderRequest): Promise<TOrderResponse> {
    return this.api.post<TOrderResponse>("/order/", orderRequest);
  }
}
