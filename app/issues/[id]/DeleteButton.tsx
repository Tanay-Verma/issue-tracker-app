import { Button } from "@radix-ui/themes";
import { AiFillDelete } from "react-icons/ai";

const DeleteButton = ({issueId}:{issueId:string}) => {
  return (
    <Button color="red">
      <AiFillDelete />
      Delete Issue
    </Button>
  );
};

export default DeleteButton;
