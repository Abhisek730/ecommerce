const Rating = require("../models/ratings.js")
const productService = require("../services/productService.js")

class RatingService {
    async createRating(reqData, user) {
        const product = await productService.findProductById(reqData.productId)
        const rating = new Rating({
            user: user._id,
            product: product._id,
            rating: reqData.rating,
            createdAt: new Date()
        })

        return await rating.save()
    }
    async getProductRatings(productId) {

        return await Rating.find({ product: productId }).populate("user")
    }
}

module.exports = new RatingService()