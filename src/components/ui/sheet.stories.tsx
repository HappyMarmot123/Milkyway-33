import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Button } from "./button";

export default {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>시트 열기</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>시트 제목</SheetTitle>
          <SheetDescription>
            이것은 시트 설명입니다. 여기에 추가 정보를 입력할 수 있습니다.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p>시트 내용이 여기에 표시됩니다.</p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">저장</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const Left = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>왼쪽에서 열기</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>왼쪽 시트</SheetTitle>
          <SheetDescription>
            왼쪽에서 열리는 시트입니다.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Top = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>위에서 열기</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>위쪽 시트</SheetTitle>
          <SheetDescription>
            위에서 열리는 시트입니다.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

export const Bottom = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>아래에서 열기</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>아래쪽 시트</SheetTitle>
          <SheetDescription>
            아래에서 열리는 시트입니다.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

