const Category = require("../models/category.js")
const Product = require("../models/product.js")

class ProductService {
    async createProduct(data) {
        let topLevel = await Category.findOne({ name: data.topLevelCategory })
        if (!topLevel) {
            topLevel = new Category({
                name: data.topLevelCategory,
                level: 1
            })
        }
        let secondLevel = await Category.findOne({
            name: data.secondLevelCategory,
            parentCategory: topLevel._id
        })

        if (!secondLevel) {
            secondLevel = new Category({
                name: data.secondLevelCategory,
                parentCategory: topLevel._id
            })
        }

        let thirdLevel = await Category.findOne({
            name: data.thirdLevelCategory,
            parentCategory: secondLevel._id
        })

        if (!thirdLevel) {
            thirdLevel = new Category({
                name: data.thirdLevelCategory,
                parentCategory: secondLevel._id
            })
        }

        const product = new Product({
            title: data.title,
            description: data.description,
            price: parseFloat(data.price),
            color: data.color,
            imageUrl: data.imageUrl,
            brand: data.brand,
            sizes: data.size,
            discountedPrice: data.discountedPrice,
            discountPercent: data.discountPercent,
            quantity: data.quantity,
            category: thirdLevel._id

        })

        return await product.save();
    }

    // Retrieve a product by ID
    async findProductById(productId) {
        try {
            const product = await Product.findById(productId).populate("category").exec();
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error('Could not retrieve the product: ' + error.message);
        }
    }

    // Update a product
    async updateProduct(productId, productData) {
        try {
            const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error('Could not update the product: ' + error.message);
        }
    }

    // Delete a product
    async deleteProduct(productId) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                throw new Error('Product not found');
            }
            return deletedProduct;
        } catch (error) {
            throw new Error('Could not delete the product: ' + error.message);
        }
    }

    // Retrieve a list of products
    async getAllProducts(query) {
        let { category, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = query

        pageSize = pageSize || 10
        try {
            const query = await Product.find().populate("category");

            if (category) {
                let existCategory = await Category.findOne({ name: category })
                if (existCategory) {
                    query = query.where("category").equals(existCategory._id)
                } else {
                    return { content: [], currentPage: 1, totalPages: 0 }
                }
            }

            if (color) {
                let colorSet = new Set(color.split(',').map(color => color.trim().toLowerCase()))
                const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null
                query = query.where("colors").in(colorRegex)
            }

            // Filter by sizes
            if (sizes) {
                const sizeSet = new Set(sizes)
                query.query.where("sizes.name").in([...sizeSet])
            }

            if (minPrice && maxPrice) {
                query = query.where("discountedPrice").gte(minPrice).lte(maxPrice)
            }
            if (minDiscount) {
                query = await query.where("discountPercent").gt(minDiscount)
            }
            if (stock) {
                if (stock == "in_stock") {
                    query = query.where("quantity").gt(0)
                } else if (stock == "out_of_stock") {
                    query = query.where("quantity").eq(0)
                }
            }

            if (sort) {
                const sortDirection = "price_hight" ? -1 : 1;
                query = query.sort({ discountedPrice: sortDirection })
            }

            const totalProducts = await Product.countDocuments(query);
            const skip = (pageNumber - 1) * pageSize;
            query * query.skip(skip).limit(pageSize)
            const products = await query.exec();
            const totalPages = Math.ceil(totalProducts / pageSize)
            return { content: products, currentPage: pageNumber, totalPages }
        } catch (error) {
            throw new Error('Could not retrieve products: ' + error.message);
        }
    }

    async createMultipleProduct() {
        for (let product of products) {
            await this.createProduct(product)
        }
    }
}

module.exports = new ProductService()

