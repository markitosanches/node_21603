const db = require('../models')
const Product = db.products
const OP = db.Sequelize.Op

exports.findAll = (req, res) => {
    Product.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Some error occurred'
        })
    })
}

exports.create = (req, res) => {
    Product.create(req.body)
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.status(500).send({
            message:
            err.message || 'Could not insert the data'
        })
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
        .then(data =>{
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || `Some error occurred cannot find data id ${id}`
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    Product.destroy({
        where: { id : id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Product was deleted"
            })
        } else {
            res.send({
                message: "Cannot delete this product"
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || `Some error occurred cannot find data id ${id}`
        })
    })
}


exports.update = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
      where: { id: id}  
    })
    .then(num => {
        if (num == 1){
            res.send({
                message: 'Product updated'
            })
        } else {
            res.send({
                message: 'Product not found'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || `Some error occurred cannot find data id ${id}`
        })
    })
}