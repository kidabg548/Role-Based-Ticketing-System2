import React, { useState } from 'react';
import { AuthLayout, AnimationSide, FormSide, Input, Button, ErrorMessage } from '../components'; // Import all from one file

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login (replace with actual authentication logic)
    if (email === 'test@example.com' && password === 'password') {
      alert('Login successful!');  // Replace with redirect
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <AuthLayout
      animationSide={<AnimationSide />}
      formSide={
        <FormSide>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage message={error} />
            <Button type="submit">Login</Button>
          </form>
          <p className="mt-4 text-sm">
            Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a>
          </p>
        </FormSide>
      }
    />
  );
};

export default Login;