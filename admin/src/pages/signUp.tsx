// import { useForm } from "react-hook-form";
// import { useMutation, useQueryClient } from "react-query";
// import * as apiClient from "../api-client";
// import { useNavigate, Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";

// export type SignupFormData = {
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// };

// const Signup = () => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();
//   const { showToast } = useAppContext();

//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<SignupFormData>();

//   const mutation = useMutation(apiClient.signup, {
//     onSuccess: async () => {
//       showToast({ message: "Signup Successful!", type: "SUCCESS" });
//       await queryClient.invalidateQueries("validateToken");
//       navigate("/login");
//     },
//     onError: (error: Error) => {
//       showToast({ message: error.message, type: "ERROR" });
//     },
//   });

//   const onSubmit = handleSubmit((data) => {
//     mutation.mutate(data);
//   });

//   return (
//     <div className="min-h-screen flex bg-white">
//       {/* Left side - Visual/Info Section */}
//       <div className="hidden md:flex md:w-1/2 bg-blue-600 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
//           {/* Abstract background elements */}
//           <div className="absolute w-96 h-96 bg-blue-400 rounded-full opacity-20 -top-20 -left-20 animate-pulse"></div>
//           <div className="absolute w-80 h-80 bg-blue-300 rounded-full opacity-20 bottom-10 right-10 animate-pulse" style={{ animationDelay: "1s" }}></div>
//           <div className="absolute w-60 h-60 bg-blue-200 rounded-full opacity-20 top-1/2 left-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>
          
//           {/* Support ticket illustration */}
//           <div className="absolute bottom-5 right-5 opacity-20">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="white" className="w-40 h-40">
//               <path d="M85,15H15c-2.8,0-5,2.2-5,5v40c0,2.8,2.2,5,5,5h25v15c0,1.7,1.3,3,3,3c0.8,0,1.6-0.3,2.1-0.9L65,65h20c2.8,0,5-2.2,5-5V20 C90,17.2,87.8,15,85,15z M30,45c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S32.8,45,30,45z M50,45c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5 S52.8,45,50,45z M70,45c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S72.8,45,70,45z"></path>
//             </svg>
//           </div>
//         </div>
        
//         {/* Content overlay */}
//         <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-12 text-white">
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20 mb-6">
//             <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
//           </svg>

//           <h1 className="text-3xl font-bold mb-4">Join Our Support System</h1>
//           <p className="text-xl text-center mb-6">Create your account today</p>
//           <div className="text-sm text-center max-w-md opacity-90 space-y-4">
//             <p>Our support ticketing system helps you get the assistance you need, when you need it.</p>
//             <ul className="space-y-2">
//               <li className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 Create and track support tickets
//               </li>
//               <li className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 Real-time updates on ticket status
//               </li>
//               <li className="flex items-center">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                 </svg>
//                 Secure and efficient communication
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
      
//       {/* Right side - Signup Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6">
//         <div className="max-w-md w-full">
//           <h2 className="text-3xl font-bold mb-2 text-gray-800">Create Account</h2>
//           <p className="text-gray-600 mb-6">Join our support system to get started</p>
          
//           <form className="space-y-4" onSubmit={onSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="firstName">
//                   First Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="firstName"
//                     className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                       errors.firstName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                     }`}
//                     placeholder="John"
//                     {...register("firstName", { required: "First name is required" })}
//                   />
//                 </div>
//                 {errors.firstName && <span className="text-red-500 text-sm mt-1 block">{errors.firstName.message}</span>}
//               </div>
//               <div>
//                 <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="lastName">
//                   Last Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="lastName"
//                     className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                       errors.lastName ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                     }`}
//                     placeholder="Doe"
//                     {...register("lastName", { required: "Last name is required" })}
//                   />
//                 </div>
//                 {errors.lastName && <span className="text-red-500 text-sm mt-1 block">{errors.lastName.message}</span>}
//               </div>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="username">
//                 Username
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   id="username"
//                   className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                     errors.username ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                   }`}
//                   placeholder="johndoe"
//                   {...register("username", { required: "Username is required" })}
//                 />
//               </div>
//               {errors.username && <span className="text-red-500 text-sm mt-1 block">{errors.username.message}</span>}
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                   </svg>
//                 </div>
//                 <input
//                   id="email"
//                   type="email"
//                   className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                     errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                   }`}
//                   placeholder="your@email.com"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//                       message: "Please enter a valid email address",
//                     },
//                   })}
//                 />
//               </div>
//               {errors.email && <span className="text-red-500 text-sm mt-1 block">{errors.email.message}</span>}
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                     errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                   }`}
//                   placeholder="••••••••"
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: { value: 6, message: "Password must be at least 6 characters" },
//                   })}
//                 />
//               </div>
//               {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password.message}</span>}
//             </div>
            
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="confirmPassword">
//                 Confirm Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   className={`pl-10 border rounded-lg w-full py-2 px-3 bg-gray-50 focus:outline-none focus:ring-2 transition-all ${
//                     errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
//                   }`}
//                   placeholder="••••••••"
//                   {...register("confirmPassword", {
//                     validate: (val) => {
//                       if (!val) {
//                         return "This field is required";
//                       } else if (watch("password") !== val) {
//                         return "Passwords do not match";
//                       }
//                     },
//                   })}
//                 />
//               </div>
//               {errors.confirmPassword && <span className="text-red-500 text-sm mt-1 block">{errors.confirmPassword.message}</span>}
//             </div>
            
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium mt-4"
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating Account...
//                 </span>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
            
//             <div className="text-center mt-6">
//               <p className="text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-blue-600 hover:text-blue-800 font-medium"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;