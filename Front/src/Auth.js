import React, { useState } from 'react';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUp(true);
  };

  const handleSignInClick = () => {
    setIsSignUp(false);
  };

  return (
    <div className={`relative overflow-hidden w-[360px] h-[500px] bg-white rounded-lg shadow-lg ${isSignUp ? 'right-panel-active' : ''}`}>
      <div className={`absolute top-0 h-full transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-[100%]' : 'left-0 w-1/2 z-10'}`}>
        <form className="flex flex-col items-center justify-center h-full p-5 text-center bg-white rounded-lg shadow-md w-full max-w-[360px]">
          <h1 className="font-bold text-2xl mb-2">Sign Up</h1>
          <div className="flex gap-4 mb-5">
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className="text-sm text-gray-600 mb-5">or use your email for registration</span>
          <input type="text" placeholder="Name" className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 w-full focus:border-[#D4451E] outline-none shadow-sm transition-all" />
          <input type="email" placeholder="Email" className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 w-full focus:border-[#D4451E] outline-none shadow-sm transition-all" />
          <input type="password" placeholder="Password" className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 w-full focus:border-[#D4451E] outline-none shadow-sm transition-all" />
          <button className="border border-[#D4451E] bg-[#D4451E] text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-transform duration-300 ease-in-out hover:scale-95 focus:outline-none">Sign Up</button>
        </form>
      </div>
      <div className={`absolute top-0 h-full transition-transform duration-600 ease-in-out ${isSignUp ? 'left-0 w-1/2 z-10' : 'translate-x-[100%]'}`}>
        <form className="flex flex-col items-center justify-center h-full p-5 text-center bg-white rounded-lg shadow-md w-full max-w-[360px]">
          <h1 className="font-bold text-2xl mb-2">Log In</h1>
          <div className="flex gap-4 mb-5">
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="text-[#D4451E] border border-[#D4451E] rounded-full p-2"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span className="text-sm text-gray-600 mb-5">or use your account</span>
          <input type="email" placeholder="Email" className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 w-full focus:border-[#D4451E] outline-none shadow-sm transition-all" />
          <input type="password" placeholder="Password" className="bg-gray-100 border border-gray-300 rounded-lg p-3 mb-3 w-full focus:border-[#D4451E] outline-none shadow-sm transition-all" />
          <a href="#" className="text-[#D4451E] text-sm mb-3">Forgot your password?</a>
          <button className="border border-[#D4451E] bg-[#D4451E] text-white font-bold py-3 px-6 rounded-lg uppercase tracking-wider transition-transform duration-300 ease-in-out hover:scale-95 focus:outline-none">Log In</button>
        </form>
      </div>
      <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-[#D4451E] text-white transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-[50%]' : '-translate-x-[50%]'}`}>
        <div className={`absolute top-0 h-full w-full flex items-center justify-center text-center p-5 transition-transform duration-600 ease-in-out ${isSignUp ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-4">Let's Register Account!</h1>
            <p className="mb-4">Enter your information to create an account.</p>
            <span className="block text-sm mb-4">Already have an account?</span>
            <a className="text-white border border-white rounded-lg py-2 px-4 uppercase font-bold" onClick={handleSignInClick}>Log In</a>
          </div>
        </div>
        <div className={`absolute top-0 h-full w-full flex items-center justify-center text-center p-5 transition-transform duration-600 ease-in-out ${isSignUp ? '-translate-x-full' : 'translate-x-0'}`}>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
            <p className="mb-4">Enter your credential to login.</p>
            <span className="block text-sm mb-4">Doesn't have an account yet?</span>
            <a className="text-white border border-white rounded-lg py-2 px-4 uppercase font-bold" onClick={handleSignUpClick}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
