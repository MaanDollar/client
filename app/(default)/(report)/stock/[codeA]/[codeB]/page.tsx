import { MOCK_STOCK_OPTIONS } from "@/types/StockTemplate";
import { notFound } from "next/navigation";
import ClientPage from "./ClientPage";

const Page = ({
  params,
}: {
  params: {
    codeA: string;
    codeB: string;
  };
}) => {
  const { codeA, codeB } = params;
  const stockA = MOCK_STOCK_OPTIONS.find((item) => item.code === codeA);
  const stockB = MOCK_STOCK_OPTIONS.find((item) => item.code === codeB);

  if (!stockA || !stockB) {
    return notFound();
  }
  return <ClientPage stockA={stockA} stockB={stockB} />;
};

export default Page;
