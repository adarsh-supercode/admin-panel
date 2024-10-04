// pages/login.js

import { useState } from 'react';
import LoginForm from '../components/LoginForm';

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

const Login = () => {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h1>Login</h1>
      <LoginForm setMessage={setMessage} />
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
