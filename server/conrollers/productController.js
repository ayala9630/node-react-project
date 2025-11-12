const Product = require("../models/Product")
const Basket = require("../models/Basket")

//create
const addProduct = async (req, res) => {
    console.log(req.body);
    const { name, descraption, category, tags, quentity, price, image } = req.body
    if (!name || !descraption) {
        return res.status(406).send("Name and descraption are required")
    }
    const newProd = { name, descraption, category, tags, quentity, price, image }
    const product = await Product.create(newProd)
    res.json(product)
}

//read
const getAll = async (req, res) => {
    const products = await Product.find().sort({ price: 1 })
    if (!products)
        return res.status(404).send("not found")
    res.json(products)
}

const getById = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(404).send("not found")
    res.json(product)
}

const getByCategory = async (req, res) => {
    const { name } = req.params
    const products = await Product.find({ category: name }).sort({ price: 1 })
    if (!products)
        return res.status(404).send("not found")
    res.json(products)
}

//update
const updateProduct = async (req, res) => {
    console.log(req.body);
    const { id, name, descraption, category, tags, price, image } = req.body
    if (!id || !name || !descraption)
        return res.status(406).send("Id, name and descraption are required")
    const product = await Product.findById(id)
    if (!product)
        return res.status(404).send("not found")
    product.name = name
    product.descraption = descraption
    product.category = category
    product.tags = tags
    product.price = price
    product.image = image
    await product.save()
    res.json(product)
}
const updateQty = async (req, res) => {
    const { id, quentity } = req.body
    if (!id || !quentity)
        return res.status(406).send("Id and quentity are required")
    const product = await Product.findById(id)
    product.quentity = product.quentity + quentity
    await product.save()
    res.json(product)
}
//delete
const deleteProduct = async (req, res) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product)
        return res.status(404).send("Not found")
    const basket = await Basket.deleteMany({ product: id })
    await product.deleteOne()
    res.send("Deleted successfully")
}
const deleteProducts = async (req, res) => {
    console.log(req.body);
    const { idArr } = req.body
    console.log(idArr);
    idArr.map(async (item) => {
        const product = await Product.findById(item._id)
        if (!product)
            return res.status(404).send("Not found")
        const basket = await Basket.deleteMany({ product: item._id })
        await product.deleteOne()
    })
    res.send("Deleted successfully")
}

module.exports = { getAll, getById, addProduct, updateProduct, updateQty, deleteProduct, getByCategory, deleteProducts }