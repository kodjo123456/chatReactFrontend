import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour la redirection

export default function Dede() {
    const navigate = useNavigate();
    const [message, setMessage] = useState(""); // État pour le message saisi
    const [chats, setChats] = useState([
        { id: 1, user: "Utilisateur 1", lastMessage: "Salut !" }
    ]);

    const handleLogout = () => {
        localStorage.removeItem("authToken"); // Supprimer le token de connexion
        navigate("/login"); // Rediriger vers la page de login
    };

    const handleMessageSend = (e) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        if (message.trim()) {
            setChats([...chats, { id: chats.length + 1, user: `Utilisateur ${chats.length + 1}`, lastMessage: message }]);
            setMessage(""); // Réinitialiser le champ après l'envoi
        }
    };

    return (
        <div style={styles.dashboard}>
            <aside style={styles.sidebar}>
                <h2 style={styles.title}>VenceChat</h2>
                <nav>
                    <ul style={styles.navList}>
                        <li><a href="#" style={styles.navItem}>Messages</a></li>
                        <li><a href="#" style={styles.navItem}>Groupes</a></li>
                        <li><a href="#" style={styles.navItem}>Contacts</a></li>
                        <li><a href="#" style={styles.navItem}>Paramètres</a></li>
                        <li><a href="/login" style={styles.navItem} onClick={handleLogout}>Déconnexion</a></li>
                    </ul>
                </nav>
            </aside>

            <main style={styles.mainContent}>
                <header style={styles.header}>
                    <h1>Bienvenue dans votre tableau de bord</h1>
                    <input type="text" placeholder="Rechercher..." style={styles.searchInput} />
                </header>

                <section style={styles.chatList}>
                    <h2>Chats récents</h2>
                    {chats.map((chat) => (
                        <div key={chat.id} style={styles.chatItem}>
                            <div style={styles.chatAvatar}>{chat.user[0]}</div>
                            <div style={styles.chatInfo}>
                                <h3>{chat.user}</h3>
                                <p>{chat.lastMessage}</p>
                            </div>
                        </div>
                    ))}

                    {/* Formulaire d'envoi de message */}
                    <form style={styles.messageForm} onSubmit={handleMessageSend}>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tapez votre message..."
                            style={styles.messageInput}
                        />
                        <button type="submit" style={styles.sendButton}>Envoyer</button>
                    </form>
                </section>
            </main>
        </div>
    );
}

const styles = {
    dashboard: {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f4f4f4',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#3b5998',
        color: 'white',
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    navList: {
        listStyle: 'none',
        padding: 0,
    },
    navItem: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
        display: 'block',
        margin: '15px 0',
    },
    mainContent: {
        flex: 1,
        padding: '20px',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    searchInput: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    chatList: {
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    chatItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        borderBottom: '1px solid #ccc',
    },
    chatAvatar: {
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        backgroundColor: '#ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '10px',
    },
    chatInfo: {
        flex: 1,
    },
    messageForm: {
        display: 'flex',
        marginTop: '20px',
    },
    messageInput: {
        flex: 1,
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginRight: '10px',
    },
    sendButton: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};