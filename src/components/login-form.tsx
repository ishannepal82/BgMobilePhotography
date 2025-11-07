import React, { useState } from "react";
import { doLoginwithEmailandPassword } from "../hooks/UseAuth";
import { useNavigate } from "react-router-dom";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    // Fetching the user idToken from firebase and storing it 
    const userCredentials =  await doLoginwithEmailandPassword(email, password);
    const user = userCredentials.user;
    const tokenId = await user.getIdToken(); // Get the user's ID token
    localStorage.setItem( 'token', tokenId);
    setIsLoading(false);
    navigate('/admin/home', { state: { loggedIn: true}});
    
  } catch (error) {
    console.error(error);
    setIsLoading(false);
  }
  };


  return (
      <div className="w-full max-w-md p-8 bg-background/20 border-2 border-primary/20 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-accent mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border-accent/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-primary/20 text-white"
            />
          </div>

          <div>
            <label className="block text-accent mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border-accent/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-primary/20 text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-4 bg-accent text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
  );
}
