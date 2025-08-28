// 'use strict';

// /**
//  * order controller
//  */

// const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::order.order');

// src/api/order/controllers/order.js
"use strict";

const Razorpay = require("razorpay");
const { createCoreController } = require("@strapi/strapi").factories;

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    try {
      const { amount, currency } = ctx.request.body;

      // 1. Create Razorpay order
      const options = {
        amount: amount * 100, // paise
        currency: currency || "INR",
        receipt: "receipt_" + Date.now(),
      };

      const razorpayOrder = await razorpay.orders.create(options);

      // 2. Save in Strapi DB
      const entry = await strapi.db.query("api::order.order").create({
        data: {
          razorpay_order_id: razorpayOrder.id,
          amount,
          currency: currency || "INR",
          status: "created",
        },
      });

      // 3. Return Razorpay order to frontend
      return { razorpayOrder, dbEntry: entry };
    } catch (err) {
      console.error("Razorpay Order Error:", err);
      ctx.throw(500, "Unable to create Razorpay order");
    }
  },
}));
