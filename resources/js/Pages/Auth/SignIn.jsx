import { useForm, usePage } from "@inertiajs/react";
import { Button, Stack, TextInput, Container, Paper, Text } from "@mantine/core"
import { Link } from "@inertiajs/react";

export default function SignIn() {

    const { errors: pageErrors } = usePage().props; 

    const { data, post, setData, processing, errors, clearErrors } = useForm({
        email: '', 
        password: '',
    }); 
    
    function handleSubmit(e) {
        e.preventDefault()
        post(''); 
    }    

    return (
        <Container mx="auto" mt="4rem" size="23rem">
          <Paper shadow="xs" p="lg">
            <form onSubmit={handleSubmit}>
              <Stack>
                <Text component={Link} href="/" ta="center" fw={700} size="xl">FactsHub</Text>
                {pageErrors && <Text color="red">{Object.values(pageErrors).join(', ')}</Text>}
                <TextInput 
                  label="E-mail address" 
                  data={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  error={errors.email ?? null}
                  onFocus={() => clearErrors('email')}
                  />
                <TextInput 
                  label="Password" 
                  data={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  error={errors.password ?? null}
                  onFocus={() => clearErrors('password')}
                  type="password"
                  />     
                <Button type="submit" disabled={processing}>Sign In</Button>
                <Button variant="subtle" component={Link} href="/sign-up">Register</Button>
              </Stack>
            </form>
          </Paper>
        </Container>
      );
}