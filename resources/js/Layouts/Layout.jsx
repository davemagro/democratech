import { AppShell, Burger, Button, Grid, Group, UnstyledButton, TextInput, Text, Container, Flex } from "@mantine/core";
import { Link } from "@inertiajs/react";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@inertiajs/react";
export default function Layout({ children }) {

  const { data, setData, post, errors, processing } = useForm({
    search: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (data.search.length > 0) {
      post("/search");
    }
  }

  return (
    <AppShell
      padding="xl"
      >
      <AppShell.Header
        py="md"
        >
        <Grid>
          <Grid.Col span={2}>
            <Text fw={700} size="xl">FactsHub</Text>
          </Grid.Col>
          <Grid.Col span={8}>
            <Group justify="center">
              <form onSubmit={handleSubmit}>
                <Group gap="0.2rem">
                  <TextInput w="40rem" placeholder="Search" value={data.search} onChange={(e) => setData("search", e.target.value)}/>
                  <Button type="submit" variant="default">
                    <IconSearch size={16} />
                  </Button>
                </Group>
              </form>
              <Button component={Link} href="/submit">Submit a Report</Button>
            </Group>
          </Grid.Col>
          <Grid.Col span={2}>
            <Flex justify="flex-end" gap="sm" align="center" h="100%">
              <UnstyledButton component={Link} href="/sign-in">Login</UnstyledButton>
              <UnstyledButton component={Link} href="/sign-up">Register</UnstyledButton>
            </Flex>
          </Grid.Col>
        </Grid>
      </AppShell.Header>
      <AppShell.Main pt="4rem">
        {children}
      </AppShell.Main>
    </AppShell>
  ); 

}