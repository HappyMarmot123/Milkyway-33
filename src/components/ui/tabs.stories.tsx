import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

export default {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export const Default = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">탭 1의 내용입니다.</TabsContent>
      <TabsContent value="tab2">탭 2의 내용입니다.</TabsContent>
      <TabsContent value="tab3">탭 3의 내용입니다.</TabsContent>
    </Tabs>
  ),
};

export const Vertical = {
  render: () => (
    <Tabs defaultValue="tab1" orientation="vertical" className="flex gap-4">
      <TabsList className="flex-col h-auto">
        <TabsTrigger value="tab1">탭 1</TabsTrigger>
        <TabsTrigger value="tab2">탭 2</TabsTrigger>
        <TabsTrigger value="tab3">탭 3</TabsTrigger>
      </TabsList>
      <div>
        <TabsContent value="tab1">탭 1의 내용입니다.</TabsContent>
        <TabsContent value="tab2">탭 2의 내용입니다.</TabsContent>
        <TabsContent value="tab3">탭 3의 내용입니다.</TabsContent>
      </div>
    </Tabs>
  ),
};

