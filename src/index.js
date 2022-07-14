import importAsString from "@reactioncommerce/api-utils/importAsString.js";

const mySchema = importAsString("./schema.graphql");
function myPublishProductToCatalog(catalogProduct, { context, product, shop, variants }) {
  catalogProduct.variants && catalogProduct.variants.map((catalogVariant) => {
    const productVariant = variants.find((variant) => variant._id === catalogVariant.variantId);
    catalogVariant.volume = productVariant.volume || null;
  });
 }

 function myStartup(context) {
  context.simpleSchemas.ProductVariant.extend({
    volume: {
      type: Number,
      min: 0,
      optional: true
    }
  });

  context.simpleSchemas.CatalogProductVariant.extend({
    volume: {
      type: Number,
      min: 0,
      optional: true
    }
  })
}
 
export default async function register(app) {
  await app.registerPlugin({
    label: "Agreements Checkboxes Plugin",
    name: "reaction-api-plugin-agreements",
    version: pkg.version,
    functionsByType: {
      startup: [myStartup],
      publishProductToCatalog: [myPublishProductToCatalog]
    },
    graphQL: {
      resolvers,
      schemas
    }
  });
}