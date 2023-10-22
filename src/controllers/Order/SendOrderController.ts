import { Request, Response } from "express";
import { SendOrderService } from "../../services/Order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {

    const { order_id } = req.body

    const sendeOrderService = new SendOrderService();

    const order = await sendeOrderService.execute({
      order_id
    })

    return res.json(order);

  }
}
export { SendOrderController }