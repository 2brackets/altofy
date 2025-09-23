import { useState } from "react";
import { RiSignalTowerFill } from "react-icons/ri";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { useToast } from "../components/toast/ToastContext";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { push } = useToast();

    function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      setIsLoading(true);
      
      if(!isValidEmail(email)){
        setIsLoading(false);
        setPassword("")
        push({ type: "warning", text: "Invalid email address" });
        return;
      }

      if(!isValidPassword(password)){
        setIsLoading(false);
        push({ type: "warning", text: "Password cannot be empty." });
        return;
      }

      setTimeout(() => {
        setIsLoading(false);
        push({ type: "success", text: "Login successful" });
      }, 2000);
    } 
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-200">
        <div className="flex flex-col items-center mb-4">
          <RiSignalTowerFill className="text-6xl text-accent mb-2" />
          <span className="text-5xl font-bold">Altofy</span>
        </div>
        <form onSubmit={handleLogin}>
          <fieldset className="fieldset bg-base-200 border-accent rounded-box w-xs border p-4">
            <legend className="fieldset-legend text-xl font-semibold">Login</legend>
            <label className="label">Email</label>
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input" 
              placeholder="Email" />
            <label className="label">Password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              className="input" 
              placeholder="Password" />
            <button
              type="submit"
              className="btn btn-accent mt-4"
              disabled={isLoading}
              onClick={() => console.log("BUTTON clicked")}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Login"
              )}
            </button>
          </fieldset>
        </form>
      </div>
    )
}