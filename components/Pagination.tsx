"use client";
import { Button, Select, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}

const allowedPageSizes = ["5", "10", "15"] as const;
export type AllowedPageSizes = typeof allowedPageSizes;
export type PageSize = (typeof allowedPageSizes)[number];
const pageSizeArr: { label: string; value: PageSize }[] = [
  { label: "Records per page 5", value: "5" },
  { label: "Records per page 10", value: "10" },
  { label: "Records per page 15", value: "15" },
];

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (itemCount <= pageSize) return null;

  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <div className="flex gap-2">
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          <MdKeyboardDoubleArrowLeft className="text-xl" />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          <MdKeyboardArrowLeft className="text-xl" />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          <MdKeyboardArrowRight className="text-xl" />
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          <MdKeyboardDoubleArrowRight className="text-xl" />
        </Button>
      </div>
      <Select.Root
        defaultValue={pageSize.toString()}
        onValueChange={(pageSize) => {
          const params = new URLSearchParams();
          if (searchParams.get("status"))
            params.append("status", searchParams.get("status")!);
          if (searchParams.get("orderBy"))
            params.append("orderBy", searchParams.get("orderBy")!);
          if (searchParams.get("order"))
            params.append("order", searchParams.get("order")!);
          params.append("pageSize", pageSize);

          const query = params.size ? `?${params.toString()}` : "";
          router.push(`/issues/list${query}`);
        }}
      >
        <Select.Trigger />
        <Select.Content>
          <Select.Group>
            <Select.Label>Page Size</Select.Label>
            {pageSizeArr.map((item) => (
              <Select.Item key={item.value} value={item.value}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default Pagination;
