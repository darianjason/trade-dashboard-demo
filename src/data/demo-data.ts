import { faker } from "@faker-js/faker";

type Company = {
  name: string;
  ticker: string;
};

export type Trade = {
  id: string;
  type: "buy" | "sell";
  company: Company;
  orderAmount: number;
  deliveryDate: Date;
  status: "processing" | "success" | "declined";
};

const newTrade = (): Trade => {
  return {
    id: faker.string.uuid(),
    type: faker.helpers.shuffle<Trade["type"]>(["buy", "sell"])[0],
    company: {
      name: faker.company.name(),
      ticker: faker.string.alpha(4).toUpperCase(),
    },
    orderAmount: faker.number.float({
      min: 10000,
      max: 1000000,
      fractionDigits: 2,
    }),
    deliveryDate: faker.date.past({ years: 5 }),
    status: faker.helpers.shuffle<Trade["status"]>([
      "processing",
      "success",
      "declined",
    ])[0],
  };
};

export function generateData(len: number) {
  faker.seed(42);
  return Array.from({ length: len }, () => newTrade());
}
