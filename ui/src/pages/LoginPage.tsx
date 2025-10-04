import { useEffect, useState } from "react";
import { RiSignalTowerFill } from "react-icons/ri";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { useToast } from "../components/toast/ToastContext";
import { Api } from "../lib/api";
import { Logger } from "../lib/logger"

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [serverStatus, setServerStatus] = useState(false);
    const [dbStatus, setDbStatus] = useState(false);
    const { push } = useToast();

    type HealthStatus = {
      server: boolean;
      database: boolean;
    };

    useEffect(() => {
      (async () => {
        try {
          const resp = await Api.get<HealthStatus>("/api/health");
          if(resp.statusCode == 200){
            setServerStatus(resp.data.server);
            setDbStatus(resp.data.database);
            if(!resp.data.database){
              push({ type: "error", text: "Database unreachable" });
            }
          }
          else{
            setServerStatus(false);
            setDbStatus(false);
            push({ type: "warning", text: "Could not contact server status code: " + resp.statusCode });
          }
      } catch (err) {
        setServerStatus(false);
        setDbStatus(false)
        Logger.error("Health check failed", err);
        push({ type: "error", text: "Backend and Database unreachable" });
      }
    })();
  }, [push]);


    function handleLogin(e: React.FormEvent) {
      e.preventDefault();
      setIsLoading(true);

      if(!serverStatus && !dbStatus){
        setIsLoading(false);
        setPassword("");
        push({ type: "error", text: "Backend or Database unreachable" });
        return;
      }
      
      if(!isValidEmail(email)){
        setIsLoading(false);
        setPassword("");
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
        <div className="w-xs mt-4 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                serverStatus === true
                  ? "bg-success"
                  : serverStatus === false
                  ? "bg-error"
                  : "bg-gray-400"
              }`}
            />
            <span className="text-sm text-base-content">Server</span>
          </div>
              
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                dbStatus === true
                  ? "bg-success"
                  : dbStatus === false
                  ? "bg-error"
                  : "bg-gray-400"
              }`}
            />
            <span className="text-sm text-base-content">Database</span>
          </div>
        </div>
      </div>
    )
}