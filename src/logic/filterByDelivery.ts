import Product from "../@types/Product";

export const filterByDelivery = (days: number) => (product: Product) =>
  (days > 0 ? calculateDaysUntilDelivery(product) <= days : true);

export const calculateDaysUntilDelivery = (product: Product) => {
  const thisYear         = new Date().getFullYear();
  const expectedDelivery = new Date(product.deliveryDate);
  expectedDelivery.setFullYear(
    expectedDelivery.getTime() < Date.now() ? thisYear + 1 : thisYear
  );

  const today             = new Date();
  const daysUntilDelivery = Math.ceil(
    (expectedDelivery.getTime() - today.getTime()) / (1000 * 3600 * 24)
  );
  return daysUntilDelivery;
};
