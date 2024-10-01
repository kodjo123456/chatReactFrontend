import { React, useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { Link, useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./Registration.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email.trim().length < 6 || email.trim().length > 32) {
      setLoading(false);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (password.trim().length < 6 || password.trim().length > 32) {
      setLoading(false);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (passwordConfirm.trim() != password.trim()) {
      setLoading(false);
      const errorMessage = "Les deux mot de passe sont différents";
      toast.error(errorMessage);
      return;
    }

    localStorage.setItem("email", email);

    // setLoading(true);
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("passwordConfirm", passwordConfirm);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v1.0.0/register",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setLoading(false);
      setTimeout(function () {
        setLoading(false);
        navigate("/otp-code/", {
          state: {
            email: email,
          },
        });
      }, 3000);
    } else {
      console.log(response.data);

      if (response.data.data.name !== undefined) {
        toast.error(response.data.data.name[0]);
      } else if (response.data.data.email !== undefined) {
        toast.error(response.data.data.email[0]);
      } else if (response.data.data.password !== undefined) {
        toast.error(response.data.data.password[0]);
      } else if (response.data.data.passwordConfirm !== undefined) {
        toast.error(response.data.data.passwordConfirm[0]);
      }

      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="drop">
        <div className="content">
          <ToastContainer stacked position="bottom-left" />

          <h2 className="animate_heartbeat">Inscription</h2>
          <form action="" onSubmit={handleSubmit}>
            <p>Veuillez remplir ses champs pour vous inscrire.</p>
            <div className="input">
              <Input
                reference={"name"}
                type={"text"}
                value={name}
                placeholder={"Saisir le nom ici"}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="input">
              <Input
                reference={"email"}
                type={"text"}
                value={email}
                placeholder={"Saisir l'adresse e-mail ici"}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className="input">
              <Input
                reference={"password"}
                type={"password"}
                value={password}
                placeholder={"Saisir le mot de passe ici"}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            {/* Afficher les données saisient dans le champ en bat de l'input
              */}

            <div className="input">
              <Input
                reference={"passwordConfirm"}
                type={"password"}
                value={passwordConfirm}
                placeholder={"Saisir le mot de passe ici"}
                onChange={(e) => {
                  setPasswordConfirm(e.target.value);
                }}
              />
            </div>

            {loading && <LoadingIndicator />}

            <div className="input">
              <Input
                disabled={loading}
                value={"S'inscrire"}
                type={"submit"}
                text={loading ? "Chargement ..." : "Soumettre"}
              />
            </div>
          </form>
        </div>
      </div>
      <Link to={"/"} className="btn signup">Connexion</Link>
    </div>
  );
}
