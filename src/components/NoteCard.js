import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { useNotes } from '../data/NotesContext';

const NoteCard = ({ note, onEdit, onDelete }) => {
  
  const handleDeletePress = () => {
    console.log('🖱️ Bouton Supprimer cliqué pour:', note.id);
    onDelete(note.id);
  };

  const handleEditPress = () => {
    onEdit(note);
  };

  // Limiter le contenu pour éviter le débordement
  const displayContent = note.content.length > 150 
    ? note.content.substring(0, 150) + '...' 
    : note.content;

  return (
    <View style={globalStyles.noteCard}>
      <Text style={globalStyles.title} numberOfLines={1}>
        {note.title}
      </Text>
      
      <Text style={globalStyles.content} numberOfLines={3}>
        {displayContent}
      </Text>
      
      <Text style={globalStyles.date}>
        📅 {note.date}
      </Text>
      
      <View style={globalStyles.buttonContainer}>
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.editButton]}
          onPress={handleEditPress}
        >
          <Text style={globalStyles.buttonText}>✏️ Modifier</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.deleteButton]}
          onPress={handleDeletePress}
        >
          <Text style={globalStyles.buttonText}>🗑️ Supprimer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoteCard;