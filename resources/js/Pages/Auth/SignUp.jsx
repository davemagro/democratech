import { useForm } from "@inertiajs/react";
import { Button, Stack, TextInput, Container, Paper, Text } from "@mantine/core"
import { useState } from "react"
import { Link } from "@inertiajs/react";

export default function SignUp() {

  const { data, post, setData, processing, errors, clearErrors } = useForm({
    email: '', 
    password: '',
    confirmPassword: ''
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
              />
            <TextInput 
              label="Confirm Password" 
              data={data.confirmPassword}
              onChange={(e) => setData('confirmPassword', e.target.value)}
              error={errors.confirmPassword ?? null}
              onFocus={() => clearErrors('confirmPassword')}
              />                        
            <Button type="submit" disabled={processing}>Sign Up</Button>
            <Button variant="subtle" component={Link} href="/sign-in">Sign In</Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}