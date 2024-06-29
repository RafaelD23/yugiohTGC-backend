import ACCOUNT_ROUTES from "./account.js";
import CARDS_ROUTES from "./cards.js";

const router = [
  {
    prefix: "account",
    route: ACCOUNT_ROUTES,
  },
  {
    prefix: "cards",
    route: CARDS_ROUTES,
  },
];

export default function getAllRoutes() {
  return router;
}
