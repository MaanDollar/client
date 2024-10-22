"use client";

import Centering from "@/components/Centering";
import { MockStockResponse } from "@/types/Stock";
import styled from "@emotion/styled";
import { Table, Typography } from "@mui/joy";
import { Fragment, PropsWithChildren, useMemo, useState } from "react";

type SortColumn =
  | "name"
  | "profit"
  | "profitRate"
  | "amount"
  | "amountTotal"
  | "priceBought"
  | "priceCurrent";

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
  portfolio: MockStockResponse[];
}

const PortfolioDetails = ({ portfolio }: Props) => {
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
    const sorted = portfolio.sort((a, b) => {
      if (sortColumn === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortColumn === "profit") {
        return (
          (b.priceCurrent - b.priceBought) * b.amount -
          (a.priceCurrent - a.priceBought) * a.amount
        );
      }
      if (sortColumn === "profitRate") {
        return (
          (b.priceCurrent - b.priceBought) / b.priceBought -
          (a.priceCurrent - a.priceBought) / a.priceBought
        );
      }
      if (sortColumn === "amount") {
        return b.amount - a.amount;
      }
      if (sortColumn === "amountTotal") {
        return b.priceCurrent * b.amount - a.priceCurrent * a.amount;
      }
      if (sortColumn === "priceBought") {
        return b.priceBought - a.priceBought;
      }
      if (sortColumn === "priceCurrent") {
        return b.priceCurrent - a.priceCurrent;
      }
      return 0;
    });
    if (sortDirection === "asc") {
      return sorted.reverse();
    }
    return sorted;
  }, [portfolio, sortColumn, sortDirection]);

  const maxAmountDigitLength = useMemo(
    () =>
      portfolio.reduce(
        (a, b) =>
          Math.max(
            a,
            (b.priceCurrent * b.amount).toString().length,
            (b.priceBought * b.amount).toString().length,
            ((b.priceCurrent - b.priceBought) * b.amount).toString().length
          ),
        0
      ),
    [portfolio]
  );

  const minWidth = Math.max(6, maxAmountDigitLength) * 0.75 + "rem";

  if (portfolio.length === 0) {
    return (
      <Centering>
        <Typography level="body-sm" textColor="text.tertiary">
          주식을 추가해주세요.
        </Typography>
      </Centering>
    );
  }

  return (
    <>
      <Typography level="title-lg">보유 잔고</Typography>
      <div style={{ height: "1rem" }} />
      <TableContainer>
        <Table
          sx={(theme) => ({
            "& *:is(td, th):first-child": {
              position: "sticky",
              left: 0,
              background: theme.palette.background.surface,
            },
            "& *:is(td, th)": {
              width: minWidth,
            },
            "& tr > *:not(:first-child)": {
              textAlign: "right",
              fontFeatureSettings: "'tnum'",
            },
            "& tr:nth-of-type(2n) > *:is(td, th)": {
              paddingTop: 0,
            },
            "& tr:nth-of-type(2n + 1) > *:is(td, th)": {
              borderBottom: "none",
              paddingBottom: 0,
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
                column="profit"
                current={sortColumn === "profit" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                평가손익
              </HeaderCell>
              <HeaderCell
                column="amount"
                current={sortColumn === "amount" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                보유수량
              </HeaderCell>
              <HeaderCell
                column="priceBought"
                current={sortColumn === "priceBought" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                매입단가
              </HeaderCell>
            </tr>
            <tr>
              <th></th>
              <HeaderCell
                column="profitRate"
                current={sortColumn === "profitRate" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                수익률
              </HeaderCell>
              <HeaderCell
                column="amountTotal"
                current={sortColumn === "amountTotal" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                평가금액
              </HeaderCell>
              <HeaderCell
                column="priceCurrent"
                current={sortColumn === "priceCurrent" ? sortDirection : null}
                setSortColumn={handleSortChange}
              >
                현재가
              </HeaderCell>
            </tr>
          </thead>
          <tbody>
            {sortedPortfolio.map((stock) => (
              <Fragment key={stock.code}>
                <tr key={stock.code}>
                  <td>
                    <Typography level="body-sm" noWrap>
                      {stock.name}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      level="body-sm"
                      color={
                        stock.priceCurrent - stock.priceBought > 0
                          ? "danger"
                          : stock.priceCurrent - stock.priceBought < 0
                          ? "primary"
                          : undefined
                      }
                    >
                      {(
                        (stock.priceCurrent - stock.priceBought) *
                        stock.amount
                      ).toLocaleString()}
                    </Typography>
                  </td>
                  <td>{stock.amount.toLocaleString()}</td>
                  <td>{stock.priceBought.toLocaleString()}</td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <Typography
                      level="body-sm"
                      color={
                        stock.priceCurrent - stock.priceBought > 0
                          ? "danger"
                          : stock.priceCurrent - stock.priceBought < 0
                          ? "primary"
                          : undefined
                      }
                    >
                      {(
                        ((stock.priceCurrent - stock.priceBought) /
                          stock.priceBought) *
                        100
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                      %
                    </Typography>
                  </td>
                  <td>
                    {(stock.priceCurrent * stock.amount).toLocaleString()}
                  </td>
                  <td>{stock.priceCurrent.toLocaleString()}</td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default PortfolioDetails;
