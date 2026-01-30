import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export default {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Table>
      <TableCaption>사용자 목록</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>이름</TableHead>
          <TableHead>이메일</TableHead>
          <TableHead>역할</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>홍길동</TableCell>
          <TableCell>hong@example.com</TableCell>
          <TableCell>관리자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>김철수</TableCell>
          <TableCell>kim@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>이영희</TableCell>
          <TableCell>lee@example.com</TableCell>
          <TableCell>사용자</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>항목</TableHead>
          <TableHead>수량</TableHead>
          <TableHead className="text-right">가격</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>상품 1</TableCell>
          <TableCell>2</TableCell>
          <TableCell className="text-right">10,000원</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>상품 2</TableCell>
          <TableCell>1</TableCell>
          <TableCell className="text-right">5,000원</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>합계</TableCell>
          <TableCell className="text-right">15,000원</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

