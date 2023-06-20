import React from 'react';
// import Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text components 
import { Box, Button, Center, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { REGISTER, DASHBOARD } from '../../lib/routes';
import { useLogin } from '../../hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from '../../util/form-validate';

const Login = () => {

    const {login, isLoading} = useLogin();
    const {register, handleSubmit, reset} = useForm();

    async function handleLogin(data) {
        await login({email: data.email, password: data.password, redirectTo: DASHBOARD});
        reset();
    }

  return (
    <Center w="100%" h="100vh">
        <Box mx="1" maxW="md" p="9" borderWidth="1px" borderRadius="lg">
            <Heading mb="4" size="lg" textAlign="center">Log In</Heading>

            <form onSubmit={handleSubmit(handleLogin)}>
            {/* Email input field */}
            <FormControl /* isInvalid={false} */ py="2">
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder='user@email.com' {...register('email', emailValidate)} />
                    <FormErrorMessage>Please Enter a Valid Email Address</FormErrorMessage>
                </FormControl>
                {/* Password input field */}
                <FormControl /* isInvalid={false} */ py="2">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder='Password' {...register('password', passwordValidate)} />
                    <FormErrorMessage>Incorrect Password</FormErrorMessage>
                </FormControl>
                {/* Submit button */}
                <Button mt="4" type='submit' colorScheme='teal' size='md' w='full' /* isLoading={false} */ loadingText="Logging In">Log In</Button>
            </form>

            <Text fontSize="xlg" align="center" mt="6">
                Don't have an account?{" "}
                <Link
                    as={RouterLink}
                    to={REGISTER}
                    color="teal.800"
                    fontWeight="medium"
                    textDecor="underline"
                    _hover={{ background: "teal.100" }}
                >
                    Register
                </Link>{" "}
                instead!
            </Text>
        </Box>
    </Center>
  )
}

export default Login;
