"use client";
import { Button, Text } from "@radix-ui/themes";
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
    <div className="flex items-center gap-2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
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
  );
};

export default Pagination;
