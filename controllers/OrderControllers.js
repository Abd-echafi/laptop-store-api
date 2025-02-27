const AppError = require('../utils/errorClass');
const Order = require('../models/orderModel');
const APIFeautures = require('../utils/feautures');

// transform object function 
const transformOrder = (order) => {
    return {
        id: order._id.toString(), // Assuming _id should be used as ORDER ID
        date: order.orderDate.toISOString(),
        status: order.orderStatus.toLowerCase(),
        total_amount: order.laptops.reduce((total, item) => total + (item.laptop.price * item.quantity), 0),
        customer: {
            full_name: order.checkout.fullName,
            phone_number: order.checkout.phone,
            address: `${order.checkout.address.commune}, ${order.checkout.address.wilaya}`,
        },
        items: order.laptops.map(item => ({
            model: item.laptop.model,
            images: item.laptop.images.length > 0 ? [item.laptop.images[0]] : [], // Only first image
            category: item.laptop.category,
            price: item.laptop.price,
            id: item.laptop._id.toString(),
        })),
        shipping: {
            shipping_method: order.checkout.shippingType,
            wilaya: order.checkout.address.wilaya,
        },
        notes: order.checkout.note || "No additional notes.",
    };
};


exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = new APIFeautures(Order.find(), req.query).filter().sort().paginate();
        const finalOrders = await orders.query.populate("laptops.laptop").populate("checkout").exec();
        // i need an array of objects each object contains : model ,total price ,phone , wilaya;
        let obj = {};
        let finalOrdersArray = [];
        finalOrders.forEach(order => {
            obj._id = order._id;
            obj.model = order.laptops[0].laptop.model;
            let totalPrice = 0;
            totalPrice = totalPrice + order.laptops[0].laptop.price * order.laptops[0].quantity;
            obj.totalPrice = totalPrice;
            obj.phone = order.checkout.phone;
            obj.wilaya = order.checkout.address.wilaya
            obj.status = order.orderStatus
            finalOrdersArray.push(obj);
        });
        res.status(200).json({
            status: "success",
            Orders: finalOrdersArray,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate("laptops.laptop").populate("checkout");
        const transformedOrder = transformOrder(order);

        res.status(200).json({
            status: "success",
            Order: transformedOrder,
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}

exports.updateOrder = async (req, res, next) => {
    try {
        const id = req.params.id;

        // Use findByIdAndUpdate with { new: true } to return the updated document
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedOrder) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: "success",
            data: {
                order: updatedOrder,
            },
        });
    } catch (err) {
        next(new AppError(err.message, 400));
    }
};

exports.daleteOrder = async (req, res, next) => {
    try {
        const id = req.params.id
        await Order.findByIdAndDelete(id);
        res.status(204).json({
            status: "success",
        })
    } catch (err) {
        next(new AppError(err.message, 400));
    }
}