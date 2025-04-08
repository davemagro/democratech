import { AppShell, Burger, Button, Grid, Group, UnstyledButton, TextInput, Text, Container, Flex, Stack } from "@mantine/core";
import { Link } from "@inertiajs/react";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@inertiajs/react";
import { useDisclosure } from "@mantine/hooks";
import { usePage } from "@inertiajs/react";

export default function Layout({ children }) {

  const { auth } = usePage().props;

  const [opened, { toggle }] = useDisclosure(false);

  const { data, setData, post, errors, processing } = useForm({
    search: "",
  });

  const handleSubmit = () => {
    if (data.search.length > 0) {
      post("/search");
    }
  }

  return (
    <AppShell
      padding="xl"
      navbar={{
        width: 300, 
        breakpoint: "sm",
        collapsed: {
          desktop: true,
          mobile: !opened 
        }
      }}
    >

      <AppShell.Header
        py="md"
        >
        <Grid gutter="0.2rem">
          <Grid.Col span={{base: 2, md: 2}} visibleFrom="md">
            <Text component={Link} href="/" fw={700} size="xl" visibleFrom="md" ml="md">FactsHub</Text>
          </Grid.Col>
          <Grid.Col span="auto">
            <Grid>
              <Grid.Col span="auto">
                <TextInput placeholder="Search" value={data.search} onChange={(e) => setData("search", e.target.value)}/>
              </Grid.Col>
              <Grid.Col span="content">
                <Button onClick={handleSubmit} variant="default" >
                  <IconSearch size={16} />
                </Button>
              </Grid.Col>
              <Grid.Col span="content">
                <Button component={Link} href="/submit">Submit a Report</Button>
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={{base: 0, md: 2}} visibleFrom="md">
            <Flex justify="flex-end" gap="sm" align="center" h="100%" visibleFrom="md" mr="md">
              {auth.user ? (
                <UnstyledButton component={Link} href="/sign-out">Logout</UnstyledButton>
              ) : (
                <>
                  <UnstyledButton component={Link} href="/sign-in">Login</UnstyledButton>
                  <UnstyledButton component={Link} href="/sign-up">Register</UnstyledButton>
                </>
              )}
            </Flex>
          </Grid.Col>
        </Grid>
      </AppShell.Header>

      <AppShell.Navbar>
        <Stack>
          <UnstyledButton component={Link} href="/sign-in">Login</UnstyledButton>
          <UnstyledButton component={Link} href="/sign-up">Register</UnstyledButton>
        </Stack>
      </AppShell.Navbar>


      <AppShell.Main pt="4rem">
        {children}
      </AppShell.Main>
    </AppShell>
  ); 

}