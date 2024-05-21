const orderService = require("../services/OrderService.js")


class AdminOrderController {
    getAllOrders = async (req, res) => {

        try {
            const orders = await orderService.getAllOrders()
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }

    confirmedOrder = async (req, res) => {
        const orderId = req.params.orderId
        try {
            const orders = await orderService.updateOrderStatus(orderId,"CONFIRMED")
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }

    shipOrders= async (req, res) => {
        const orderId = req.params.orderId
        try {
            const orders = await orderService.updateOrderStatus(orderId,SHIPPED)
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }
    deliveredOrders= async (req, res) => {
        const orderId = req.params.orderId
        try {
            const orders = await orderService.updateOrderStatus(orderId,"DELIVERED")
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }
    cancelledOrders= async (req, res) => {
        const orderId = req.params.orderId
        try {
            const orders = await orderService.updateOrderStatus(orderId,"CANCELLED")
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }

    deleteOrder= async (req, res) => {
        const orderId = req.params.orderId
        try {
            const orders = await orderService.deleteOrder(orderId)
            return res.status(200).send(orders)
        } catch (error) {
            return res.status(500).send({ error: error.message })
        }
    }
}

module.exports = new AdminOrderController()