import Layout from "../Layouts/Layout";
import { Text } from "@mantine/core";
function Search() {
  return (
    <Text py="4rem" ta="center" fw={700} size="xl">Coming Soon!</Text>
  );
}

Search.layout = (page) => <Layout>{page}</Layout>;

export default Search;