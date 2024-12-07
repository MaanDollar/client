import { listAllStocks, listPriceDetails } from "@/api/stock";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage";

const Page = async ({
  params,
}: {
  params: {
    codeA: string;
    codeB: string;
  };
}) => {
  const stocks = await listAllStocks();
  if (!stocks) {
    return notFound();
  }

  const { codeA, codeB } = params;
  const stockA = stocks.find((item) => item.code === codeA);
  const stockB = stocks.find((item) => item.code === codeB);

  if (!stockA || !stockB) {
    return notFound();
  }

  const [priceA, priceB] = await Promise.all([
    listPriceDetails(stockA.code),
    listPriceDetails(stockB.code),
  ]);
  return (
    <ClientPage
      stockA={stockA}
      stockB={stockB}
      priceA={priceA}
      priceB={priceB}
    />
  );
};

export default Page;
