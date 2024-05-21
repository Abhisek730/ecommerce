const Cart = require('../models/cart'); // Import the Cart model
const Product = require("../models/product")
const CartItem = require("../models/cartItem")

class CartService {
    // Create a new cart
    async createCart(userId) {
        try {
            const newCart = new Cart({
                user: userId,
            });

            const savedCart = await newCart.save();
            return savedCart;
        } catch (error) {
            throw new Error('Could not create cart: ' + error.message);
        }
    }

    // Find a user's cart by userId
    async findUserCart(userId) {
        try {
            const cart = await Cart.findOne({ user: userId }).populate({
                path: 'cartItems',
                populate: {
                    path: 'product', // Assuming 'product' is the field that references products in 'CartItem'
                },
            });

            if (!cart) {
                return null; // Cart not found
            }

            // Calculate totalPrice, discountedPrice, and totalItem
            let totalPrice = 0;
            let discountedPrice = 0;
            let totalItem = 0;

            for (const cartItem of cart.cartItems) {
                const { quantity, price, discountedPrice: itemDiscountedPrice } = cartItem;
                totalPrice += price * quantity;
                discountedPrice += itemDiscountedPrice * quantity;
                totalItem += quantity;
            }

            // Update the cart document with calculated values
            cart.totalPrice = totalPrice;
            cart.totalDiscountedPrice = discountedPrice;
            cart.totalItem = totalItem;



            return cart;
        } catch (error) {
            throw new Error('Could not find user cart: ' + error.message);
        }
    }

    // Add a new item to the user's cart
    async addCartItem(userId, productId, quantity, price, discountedPrice, size) {
        try {
            // Find the user's cart
            const cart = await Cart.findOne({ user: userId });
            const product = await Product.findById(productId)

            if (!cart) {
                throw new Error('User does not have a cart');
            }

            // Check if the product with the same ID already exists in the cart
            const existingCartItem = await CartItem.findOne({ cart: cart._id, product: product._id, userId })

            if (!existingCartItem) {
                // If the product does not exist in the cart, add a new cart item
                const newCartItem = new CartItem({
                    cart: cart._id,
                    product: product._id,
                    quantity: quantity || 1,
                    price: product.price,
                    discountedPrice: product.discountedPrice,
                    userId: userId,
                    size: size
                })

                // Save the cart with the updated cart items and totals
                const createdCartItem = await newCartItem.save();
                cart.cartItems.push(createdCartItem)
                return "Item added To Cart"
            }

        } catch (error) {
            throw new Error('Could not add item to the cart: ' + error.message);
        }
    }
}

module.exports = new CartService();
