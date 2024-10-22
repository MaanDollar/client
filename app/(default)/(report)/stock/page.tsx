import { MOCK_STOCK_OPTIONS } from "@/types/StockTemplate";
import { notFound, redirect } from "next/navigation";

const Page = () => {
  return redirect(
    `/stock/${MOCK_STOCK_OPTIONS[0].code}/${MOCK_STOCK_OPTIONS[1].code}`
  );
};

export default Page;
