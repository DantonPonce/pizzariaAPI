import prismaClient from "../../prisma";

class ListOrdersServices {
  async execute() {

    const listOrders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return listOrders;

  }
}

export { ListOrdersServices }