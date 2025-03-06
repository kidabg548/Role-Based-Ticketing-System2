import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", disabled = false, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

interface InputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const Input: React.FC<InputProps> = ({ id, label, type = "text", placeholder, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    message ? <p className="text-red-500 text-xs italic">{message}</p> : null
  );
};


interface AuthLayoutProps {
  animationSide: React.ReactNode;
  formSide: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ animationSide, formSide }) => {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        {animationSide}
      </div>
      <div className="w-1/2 flex items-center justify-center">
        {formSide}
      </div>
    </div>
  );
};

const AnimationSide: React.FC = () => {
  return (
    <div className="p-8">
      {/* Replace this with your actual animation component or content */}
      <h2 className="text-2xl font-bold mb-4">Website Animation</h2>
      <p className="text-gray-700">
        This is where the awesome animation related to your website idea will go.
      </p>
    </div>
  );
};

interface FormSideProps {
  children: React.ReactNode;
}

const FormSide: React.FC<FormSideProps> = ({ children }) => {
  return (
    <div className="w-full max-w-md p-8">
      {children}
    </div>
  );
};

export { Button, Input, ErrorMessage, AuthLayout, AnimationSide, FormSide };