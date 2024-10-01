import React, { useRef, useState } from "react";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import "./Dialogue.css";
import { toast, ToastContainer } from "react-toastify";
import LoadingIndicator from "../loading/LoadingIndicator";
import axios from "axios";

export default function AddGroup() {
  const dialog = useRef();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState(null); // On stocke le fichier brut ici
  const [loading, setLoading] = useState(false);

  const openHandler = () => {
    dialog.current.showModal();
  };

  const closeHandler = () => {
    dialog.current.close();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file); // On stocke directement le fichier
    }
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(); // FormData, pas fromData

    if (!name) {
      toast.error("Veuillez renseigner le nom du groupe !");
      setLoading(false);
      return;
    }

    formData.append("name", name);
    formData.append("description", description);

    if (profile) {
      formData.append("file", profile); // Envoyer le fichier brut
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1.0.0/create/group",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data", // Important pour les fichiers
          },
        }
      );

      if (response.data.success) {
        toast.success("Le groupe a été créé avec succès !");
        setTimeout(function () {
          setLoading(false);
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

    closeHandler();
  };

  return (
    <div className="dialogue-container">
      <ToastContainer stacked position="bottom-left" />
      <dialog ref={dialog} className="dialogue">
        <button onClick={closeHandler} type="button">
          Fermer
        </button>

        <form onSubmit={handlerSubmit}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"Le nom du groupe ici ..."}
            type={"text"}
            label={"Donnez un nom à votre groupe."}
            reference={"name"}
          />
          <br />

          {profile && (
            <img
              src={URL.createObjectURL(profile)} // Aperçu de l'image
              alt="Uploaded"
              className="profile-img"
            />
          )}
          <p>Veuillez choisir une photo de profil.</p>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <br />
          <br />
          <textarea
            className="description"
            name="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          {loading && <LoadingIndicator />}

          <Button text={"Créer"} type={"submit"} />
        </form>
      </dialog>
      <button type="button" onClick={openHandler}>
        Ajouter un Groupe
      </button>
    </div>
  );
}
