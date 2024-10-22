"use client";

import Centering from "@/components/Centering";
import { MockStockInterestResponse } from "@/types/StockInterest";
import styled from "@emotion/styled";
import { Button, Stack, Table, Typography } from "@mui/joy";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { Fragment, PropsWithChildren, useMemo, useState } from "react";

type SortColumn = "name" | "priceCurrent" | "priceYesterday" | "priceChange";

const TableContainer = styled("div")`
  overflow-x: auto;
`;

interface HeaderProps {
  column: SortColumn;
  current: "asc" | "desc" | null;
  setSortColumn: (column: SortColumn) => void;
}

const HeaderCell = ({
  column,
  current,
  setSortColumn,
  children,
}: PropsWithChildren<HeaderProps>) => {
  return (
    <th
      role="button"
      tabIndex={0}
      onClick={() => setSortColumn(column)}
      style={{
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <Typography level="body-sm" textColor="text.tertiary">
        {children}
        {current === "asc" && " ▲"}
        {current === "desc" && " ▼"}
      </Typography>
    </th>
  );
};

interface Props {
  interest: MockStockInterestResponse[];
  onAddModalOpen: () => void;
  onDeleteModalOpen: (stock: MockStockInterestResponse) => void;
}

const InterestDetails = ({
  interest,
  onAddModalOpen,
  onDeleteModalOpen,
}: Props) => {
  const [sortColumn, setSortColumn] = useState<SortColumn>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSortChange = (column: SortColumn) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection(column === "name" ? "asc" : "desc");
    }
  };

  const sortedPortfolio = useMemo(() => {
    const sorted = interest.sort((a, b) => {
      if (sortColumn === "name") {
        return a.name.localeCompare(b.name, "ko");
      }
      if (sortColumn === "priceCurrent") {
        return b.priceCurrent - a.priceCurrent;
      }
      if (sortColumn === "priceYesterday") {
        return b.priceYesterday - a.priceYesterday;
      }
      if (sortColumn === "priceChange") {
        return (
          b.priceCurrent / b.priceYesterday -
          1 -
          (a.priceCurrent / a.priceYesterday - 1)
        );
      }
      return 0;
    });
    if (sortDirection === "asc") {
      return sorted.reverse();
    }
    return sorted;
  }, [interest, sortColumn, sortDirection]);

  const maxAmountDigitLength = useMemo(
    () =>
      interest.reduce(
        (a, b) =>
          Math.max(
            a,
            b.priceCurrent.toString().length,
            b.priceYesterday.toString().length
          ),
        0
      ),
    [interest]
  );

  const minWidth = Math.max(6, maxAmountDigitLength) * 0.75 + "rem";

  if (interest.length === 0) {
    return (
      <Centering sx={{ padding: "2rem 0" }}>
        <Button startDecorator={<IconPlus />} onClick={onAddModalOpen}>
          관심종목 추가
        </Button>
      </Centering>
    );
  }

  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography level="title-lg">관심종목</Typography>
        <Button
          startDecorator={<IconPlus />}
          variant="outlined"
          onClick={onAddModalOpen}
        >
          추가
        </Button>
      </Stack>
      <div style={{ height: "1rem" }} />
      <Typography level="body-sm" textColor="text.tertiary">
        종목명을 클릭하여 AI 리포트를 열람할 수 있습니다.
      </Typography>
      <div style={{ height: "1rem" }} />
      <TableContainer>
        <Table
          sx={(theme) => ({
            "& *:is(td, th):first-child": {
              position: "sticky",
              left: 0,
              background: theme.palette.background.surface,
              width: "8rem",
            },
            "& *:is(td, th)": {
              width: minWidth,
            },
            "& tr > *:not(:first-child)": {
              textAlign: "right",
              fontFeatureSettings: "'tnum'",
            },
          })}
        >
          <thead>
            <tr>
              <HeaderCell
                column="name"
                current={sortColumn === "name" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                종목
              </HeaderCell>
              <HeaderCell
                column="priceCurrent"
                current={sortColumn === "priceCurrent" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                현재가
              </HeaderCell>
              <HeaderCell
                column="priceYesterday"
                current={sortColumn === "priceYesterday" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                전일가
              </HeaderCell>
              <HeaderCell
                column="priceChange"
                current={sortColumn === "priceChange" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                전일대비
              </HeaderCell>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {sortedPortfolio.map((stock) => (
              <Fragment key={stock.code}>
                <tr key={stock.code}>
                  <td>
                    <Typography
                      component={Link}
                      href={`/stock/${stock.code}`}
                      level="body-sm"
                      noWrap
                    >
                      {stock.name}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      level="body-sm"
                      color={
                        stock.priceCurrent - stock.priceYesterday > 0
                          ? "danger"
                          : stock.priceCurrent - stock.priceYesterday < 0
                          ? "primary"
                          : undefined
                      }
                    >
                      {stock.priceCurrent.toLocaleString()}
                    </Typography>
                  </td>
                  <td>
                    <Typography level="body-sm">
                      {stock.priceYesterday.toLocaleString()}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      level="body-sm"
                      color={
                        stock.priceCurrent - stock.priceYesterday > 0
                          ? "danger"
                          : stock.priceCurrent - stock.priceYesterday < 0
                          ? "primary"
                          : undefined
                      }
                    >
                      {(
                        (stock.priceCurrent / stock.priceYesterday - 1) *
                        100
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Typography>
                  </td>
                  <td>
                    <Button
                      variant="outlined"
                      onClick={() => onDeleteModalOpen(stock)}
                      color="danger"
                    >
                      <IconTrash />
                    </Button>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default InterestDetails;
