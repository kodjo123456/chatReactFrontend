import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function ChatApp() {
  const [message, setMessage] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [newGroupDescription, setNewGroupDescription] = useState("");
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [file, setFile] = useState(null); // Ajout de l'état pour le fichier
  const [groupFiles, setGroupFiles] = useState({}); // Assurez-vous que cette ligne est bien présente


 
  const handleCreateGroup = async () => {
    if (newGroupName.trim() === "") {
      toast.error("Le nom du groupe est requis !");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1.0.0/groups", {
        name: newGroupName,
        description: newGroupDescription || "Aucune description",
        if(groupImage) {
          formData.append("profile", groupImage); // Ajoutez l'image du groupe
        }
      });

      const newGroup = response.data; // Assurez-vous que l'API renvoie un groupe avec un champ `id`
      setGroups([...groups, newGroup]); // Ajoutez le groupe avec son id
      setNewGroupName("");
      setNewGroupDescription("");
      toast.success("Groupe créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de la création du groupe :", error);
      toast.error("Échec de la création du groupe");
    }
  };


  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleSendMessage = () => {
    console.log("Message envoyé:", message);
    setMessage(""); // Réinitialiser le champ après envoi
  };

  const handleAddMember = () => {
    if (newMemberEmail.trim() === "") {
      alert("Veuillez saisir un email valide !");
      return;
    }
    // Envoyer l'e-mail d'invitation ici (simulé)
    alert(`Invitation envoyée à ${newMemberEmail} pour rejoindre ${selectedGroup.name}`);
    setNewMemberEmail("");
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };


  const handleSendFile = () => {

    if (file && selectedGroup) {
      // Ajouter le fichier à l'état de fichiers pour le groupe sélectionné
      const newFile = { name: file.name, date: new Date().toLocaleString() };
      setGroupFiles((prevFiles) => ({
        ...prevFiles,
        [selectedGroup.name]: [...(prevFiles[selectedGroup.name] || []), newFile],
      }));
      // Logique d'envoi de fichier ici
      toast.success(`Fichier ${file.name} envoyé au groupe ${selectedGroup.name}`);
      setFile(null); // Réinitialiser le fichier après envoi
    } else if (!file) {
      toast.error("Veuillez sélectionner un fichier à envoyer !");
    } else if (!selectedGroup) {
      toast.error("Veuillez sélectionner un groupe avant d'envoyer un fichier !");
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer stacked position="bottom-left" />

      {/* Barre de navigation */}

      {/* Section pour créer et afficher les groupes */}
      <div style={styles.sectionBlack}>
        <h3>Créer un groupe</h3>
        <input
          type="text"
          placeholder="Nom du groupe"
          value={newGroupName}
          onChange={(e) => setNewGroupName(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Description du groupe (facultatif)"
          value={newGroupDescription}
          onChange={(e) => setNewGroupDescription(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleCreateGroup}>
          Créer un groupe
        </button>
        <h3>Liste des groupes</h3>
        <ul>
          {groups.map((group, index) => (
            <li
              key={index}
              style={styles.groupItem}
              onClick={() => handleSelectGroup(group)}
            >
              <img
                src={group.profile}
                alt={group.name}
                style={styles.groupProfile}
              />
              <strong>{group.name}</strong> <br />
              <small>{group.description}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Section pour envoyer les invitations ou ajouter des membres */}
      <div style={styles.sectionBlue}>
        {selectedGroup ? (
          <>
            <h3>Groupe sélectionné: {selectedGroup.name}</h3>
            <input
              type="email"
              placeholder="Ajouter un membre par email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              style={styles.input}
            />
            <button style={styles.button} onClick={handleAddMember}>
              Envoyer une invitation
            </button>

            {/* Section pour envoyer un fichier */}
            <input type="file" onChange={handleFileChange} style={styles.input} />
            <button style={styles.button} onClick={handleSendFile}>
              Envoyer le fichier
            </button>
          </>

        ) : (
          <h3>Sélectionnez un groupe pour ajouter des membres</h3>
        )}
      </div>

      {/* Section pour les discussions */}

      <div style={styles.sectionGrey}>

        <div style={styles.chatArea}>
          <nav style={styles.navbar}>
            <h3>Discussions</h3>
          </nav>
          {/* Afficher les fichiers envoyés */}
          {selectedGroup && groupFiles[selectedGroup.name] ? (
            <div style={styles.fileList}>
              <h4>Fichiers envoyés:</h4>
              <ul>
                {groupFiles[selectedGroup.name].map((file, index) => (
                  <li key={index}>
                    {file.name} - envoyé le {file.date}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Aucun fichier n'a été envoyé dans ce groupe.</p>
          )}
        </div>
        {/* Zone de discussion */}
        <div style={styles.messageBar}>
          <input
            type="text"
            placeholder="Saisir un message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSendMessage} style={styles.button}>
            Envoyer
          </button>
        </div>
      </div>

      {/* Barre pour saisir un message */}

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh", // Hauteur 100% de l'écran
    width: "100%",   // Largeur 100% de l'écran
  },
  navbar: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px",
    textAlign: "center",
  },
  sectionBlack: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    flex: 1,
    overflowY: "auto", // Ajout du scroll si nécessaire
  },
  sectionBlue: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "20px",
    flex: 1,
    overflowY: "auto", // Ajout du scroll si nécessaire
  },
  sectionGrey: {
    backgroundColor: "#d3d3d3",
    color: "#333",
    padding: "20px",
    flex: 2,
    display: "flex",
    flexDirection: "column",
  },
  groupItem: {
    cursor: "pointer",
    padding: "10px",
    border: "1px solid #fff",
    marginBottom: "5px",
    display: "flex", // Pour afficher l'image et le nom en ligne
    alignItems: "center",
  },
  groupProfile: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    marginRight: "10px", // Espace entre l'image et le texte
  },
  button: {
    padding: "10px 15px",
    margin: "10px 0",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
  },
  messageBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    marginBottom: "10px",
  },
};
