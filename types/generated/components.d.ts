import type { Schema, Struct } from '@strapi/strapi';

export interface ProductVariant extends Struct.ComponentSchema {
  collectionName: 'components_product_variants';
  info: {
    displayName: 'variant';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'product.variant': ProductVariant;
    }
  }
}
