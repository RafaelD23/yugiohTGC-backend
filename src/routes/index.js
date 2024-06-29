import ACCOUNT_ROUTES from "./account.js";
import CARDS_ROUTES from "./cards.js";

const router = [
  {
    prefix: "account",
    route: ACCOUNT_ROUTES,
    public: ["/account/handle-login", "/account/handle-register"]
  },
  {
    prefix: "cards",
    route: CARDS_ROUTES,
    public: ["/cards/all"]
  },
];

export const getPublicRoutes = () => {
  const publicRoutes = router.map((item) => {
    return item.public;
  })

  return publicRoutes.flat();
}

export default function getAllRoutes() {
  return router;
}
