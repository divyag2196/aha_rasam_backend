// 'use strict';

// /**
//  * order router
//  */

// const { createCoreRouter } = require('@strapi/strapi').factories;

// module.exports = createCoreRouter('api::order.order');

// src/api/order/routes/order.js
module.exports = {
  routes: [
    {
      method: "POST",
      path: "/orders",
      handler: "order.create",
      config: {
        auth: false, // keep public for now (later secure)
      },
    },
  ],
};
