import ACCOUNT_ROUTES from "./account.js";

const router = [
  {
    prefix: "account",
    route: ACCOUNT_ROUTES,
  },
];

export default function getAllRoutes() {
  return router;
}
