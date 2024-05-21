const CartItem = require("../models/cartItem")
const UserService = require("../services/userService.js")
const userService = new UserService()

class CartItemService {
    async updateCartItem(userId, cartItemId, cartItemData) {
        try {
            const item = await findCartItemById(cartItemId)
            if (!item) {
                throw { status: 404, message: "No such item" }
            }
            const user = await userService.findUserById(item.userId)
            if (!user) {
                throw { status: 404, message: "No such user" }
            }
            if (user._id.toString() === userId.toString()) {
                item.quatity = cartItemData.quatity;
                item.price = item.quatity * item.product.price;
                item.discountedPrice = item.quatity * item.product.discountedPrice;
                const updateCartItem = await item.save();
                return updateCartItem
            } else {
                throw { status: 401, message: "Unauthorized access" }
            }
        } catch (err) {
            return err
        }
    }

    async removeCartItem(userId, cartItemId) {
        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(userId);

        if (user._id.toString() === cartItem.userId.toString()) {
            await CartItem.findByIdAndDelete(cartItemId)
        }
        throw new Error("you cant remove another user's Item")
    }

    async findCartItemById(cartItemId) {
        const cartItem = await CartItem.findCartItemById(cartItemId);
        if (cartItem) {
            return cartItem
        } else {
            throw new Error("CartItem not dound with id ", cartItemId)
        }
    }
}

module.exports = new CartItemService()