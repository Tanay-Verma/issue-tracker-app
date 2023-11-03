import { Button, Text } from "@radix-ui/themes";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

interface Props {
  currentPage: number;
  itemCount: number;
  pageSize: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (itemCount === pageSize) return null;
  return (
    <div className="flex items-center gap-2">
      <Text>
        Page {currentPage} of {pageCount}
      </Text>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <MdKeyboardDoubleArrowLeft className="text-xl"/>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === 1}>
        <MdKeyboardArrowLeft className="text-xl"/>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <MdKeyboardArrowRight className="text-xl"/>
      </Button>
      <Button color="gray" variant="soft" disabled={currentPage === pageCount}>
        <MdKeyboardDoubleArrowRight className="text-xl"/>
      </Button>
    </div>
  );
};

export default Pagination;
