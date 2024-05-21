const cartService = require("./cartService.js")
const Address = require("../models/address.js")
const OrderItem = require("../models/orderItem.js")
const Order = require("../models/order.js")

// Define order status constants
const ORDER_STATUS = {
    PLACED: 'PLACED',
    CONFIRMED: 'CONFIRMED',
    SHIPPED: 'SHIPPED',
    DELIVERED: 'DELIVERED',
    CANCELLED: 'CANCELLED',
};

class OrderService {
    async createOrder(user, shippingAddress) {
        try {
            let address;

            if (shippingAddress._id) {
                address = await Address.findById(shippingAddress._id);
            } else {
                address = new Address(shippingAddress);
                address.user = user;
                await address.save();
                user.addresses.push(address);
                await user.save();
            }

            const cart = await cartService.findUserCart(user._id);
            const orderItems = [];

            for (const item of cart.cartItems) {
                const orderItem = new OrderItem({
                    price: item.price,
                    product: item.product,
                    quantity: item.quantity,
                    size: item.size,
                    userId: item.userId,
                    discountedPrice: item.discountedPrice,
                });

                const createdOrderItem = await orderItem.save();
                orderItems.push(createdOrderItem);
            }

            const createdOrder = new Order({
                user,
                orderItems,
                totalPrice: cart.totalPrice,
                totalDiscountedPrice: cart.totalDiscountedPrice,
                discount: cart.discount,
                totalItem: cart.totalItem,
                shippingAddress: address,
            });

            const savedOrder = await createdOrder.save();
            return savedOrder;
        } catch (error) {
            throw new Error('Could not create an order: ' + error.message);
        }
    }

    async placeOrder(orderId) {
        let order = await this.findOrderById(orderId)
        order.orderStatus = "PLACED"
        order.paymentDetails.status = "COMPLETED"
        return await order.save()
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const order = await this.findOrderById(orderId);

            // Check if the newStatus is a valid order status
            if (Object.values(ORDER_STATUS).includes(newStatus)) {
                order.orderStatus = newStatus;
                await order.save();
                return order;
            } else {
                throw new Error('Invalid order status');
            }
        } catch (error) {
            throw new Error('Could not update order status: ' + error.message);
        }
    }
    async findOrderById(orderId) {
        let order = await Order.findById(orderId)
            .populate('user')
            .populate({ path: 'orderItems', populate: { path: 'product' } })
            .populate('shippingAddress');

        if (!order) {
            throw new Error('Order not found');
        }

        return order;
    }

    async userOrderHistory(userId) {
        try {
            const order = await Order.find({ user: userId, orderStatus: "PLACED" }).populate({ path: "orderItems", populate: { path: "product" } }).lean()
            return order
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAllOrders(page, limit) {
        try {
            const orders = await Order.find()
                .populate({ path: 'orderItems', populate: { path: 'product' } })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean();
            return orders;
        } catch (error) {
            throw new Error('Could not retrieve orders: ' + error.message);
        }
    }
    async deleteOrder(orderId) {
        try {
            const order = await this.findOrderById(orderId);
            await Order.findByIdAndDelete(order._id);
        } catch (error) {
            throw new Error('Could not delete order: ' + error.message);
        }
    }

}

module.exports = new OrderService()