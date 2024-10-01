
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Input from "./components/input/Input";
import Button from "./components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "./components/loading/LoadingIndicator";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fromData = new FormData();
    fromData.append("email", email);
    fromData.append("password", password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1.0.0/login",
        fromData
      );

      if (response.data.success) {
        const token = response.data.data.token;

        toast.success("Bienvenue parmis nous " + email);
        localStorage.setItem("token", token);
        console.log("Token stored:", response.data.token);
        setTimeout(function () {
          setLoading(false);
          navigate("/dashboard");
        }, 3500);
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Une erreur s'est produite");
      console.log("Error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="drop">
        <div className="content">

          <ToastContainer stacked position="bottom-left" />
          <h2 className="animate_heartbeat">Connection</h2>

          <form onSubmit={handleSubmit}>
            <p>
              Veuillez Renseigner vos informations de connexion pour vous connecter.
            </p>
            <div className="input">
              <Input
                reference={"email"}
                type={"email"}
                placeholder={"Saisir l'email ici..."}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="input">
              <Input
                // label={"Mot de passe"}
                reference={"password"}
                type={"password"}
                placeholder={"Saisir le mot de passe ici..."}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            {loading && <LoadingIndicator />}
            <div className="input">
              <Input
                disabled={loading}
                value={"Login"}
                type={"submit"}
                text={loading ? "Traitement..." : "Soumettre"}
              />
            </div>
          </form>
        </div>
      </div>
      <Link to={"/OtpCode"} className="btn">Forgot Password</Link>
      <Link to={"/registration"} className="btn signup">Signup</Link>
    </div>
  );
}

export default App;
