import products from "../data/items.json";
import { calculateDaysUntilDelivery } from "./filterByDelivery";

const getMaxDeliveryDays = () =>
  Math.max(...products.map(calculateDaysUntilDelivery));

export default getMaxDeliveryDays;
