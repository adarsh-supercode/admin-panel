import { useState } from 'react';
import { useRouter } from 'next/router';
import SignupForm from '../components/SignupForm';

export const getServerSideProps = async (context) => {
  const { req } = context;

  const token = req.cookies.token;
  if (token) {
    return {
      redirect: {
        destination: '/admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Signup = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const onSignupSuccess = () => {
    setMessage('Signup successful! Redirecting to login page.');
    router.push('/login');
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <SignupForm onSignupSuccess={onSignupSuccess} setMessage={setMessage} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
