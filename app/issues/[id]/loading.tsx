import { Card, Flex, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailsPage = () => {
  return (
    <div className="max-w-xl">
      <Skeleton/>

      <Flex gap="3" my="2">
        <Skeleton width="5rem" />

        <Text>
          <Skeleton width="8rem" />
        </Text>
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={5} />
      </Card>
    </div>
  );
};

export default LoadingIssueDetailsPage;
