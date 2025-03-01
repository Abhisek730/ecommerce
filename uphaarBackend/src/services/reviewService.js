const Review = require("../models/reviews.js")
const productService = require("../services/productService.js")

class ReviewService {
    async createReview(reqData, user) {
        const product = await productService.findProductById(reqData.productId)
        const review = new Review({
            user: user._id,
            product: product._id,
            review: reqData.review,
            createdAt: new Date()
        })
        await product.save()
        return await review.save()
    }
    async getProductReviews(productId) {
        const product = await productService.findProductById(reqData.productId);
        return await Review.find({ product: productId }).populate("user")
    }
}

module.exports = new ReviewService()