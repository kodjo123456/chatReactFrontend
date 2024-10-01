import React, { useState } from 'react';

const SendInvitation = () => {
  const [email, setEmail] = useState('');

  const handleSendInvitation = () => {
    // Logique d'envoi de l'invitation
    alert(`Invitation envoyée à: ${email}`);
  };

  return (
    <div className="form-page">
      <h2>Envoyer une invitation</h2>
      <input
        type="email"
        placeholder="Email du destinataire"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSendInvitation}>Envoyer</button>
    </div>
  );
};

export default SendInvitation;
