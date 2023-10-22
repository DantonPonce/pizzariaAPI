import { Request, Response } from "express";
import { ListOrdersServices } from "../../services/Order/ListOrdersService";

class ListOrdersController {
  async handle(req: Request, res: Response) {

    const listOrderService = new ListOrdersServices();

    const listOrders = await listOrderService.execute();

    return res.json(listOrders);

  }
}

export { ListOrdersController }