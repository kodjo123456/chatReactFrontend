import React, { useState } from 'react';

const CreateGroup = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleCreateGroup = () => {
    // Logique de création du groupe
    alert(`Groupe créé: ${groupName}, Description: ${groupDescription}`);
  };

  return (
    <div className="form-page">
      <h2>Créer un nouveau groupe</h2>
      <input
        type="text"
        placeholder="Nom du groupe"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description du groupe"
        value={groupDescription}
        onChange={(e) => setGroupDescription(e.target.value)}
      />
      <button onClick={handleCreateGroup}>Créer</button>
    </div>
  );
};

export default CreateGroup;
