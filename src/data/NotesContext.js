import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => { 
    const loadNotes = async () => {// charger les notes depuis AsyncStorage
      try {
        const savedNotes = await AsyncStorage.getItem('@myNotes_app');
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes);
          setNotes(parsedNotes);
          console.log('✅ Notes chargées:', parsedNotes.length);
        }
      } catch (e) {
        console.error('Erreur chargement:', e);
      }
    };
    loadNotes();
  }, []);

  const addNote = async (note) => {
    const uniqueId = Date.now().toString() + Math.random().toString(36).substr(2, 9);// creer un id unique 
    
    const newNote = {
      ...note,
      id: uniqueId,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      color: note.color || '#ed65cbff' // Ajout de la couleur avec valeur par défaut
    };
    
    console.log('➕ NOUVELLE NOTE - ID:', uniqueId, 'Couleur:', newNote.color);
    
    const newNotes = [newNote, ...notes];
    setNotes(newNotes);
    await AsyncStorage.setItem('@myNotes_app', JSON.stringify(newNotes));// n3mlou enregistrement ll tableau  w baad naamlou transformation en text json 5tr b async mnjmouch nstokou w baad nstanou l'enregistrement bl await 
    return newNote;
  };

  const updateNote = async (id, updatedNote) => {
    if (!id) return;
    
    const newNotes = notes.map(note => // creer un nouveau tableau de notes
      note.id === id.toString() // est ce que c'est la note a modifier ?
        ? { ...note, ...updatedNote }//on garde toutes les anciennes propriétés et on remplace celles qui changent 
        : note
    );
    
    setNotes(newNotes);
    await AsyncStorage.setItem('@myNotes_app', JSON.stringify(newNotes));
  };

  // FONCTION DELETE NOTE 
  const deleteNote = async (id) => {
    console.log('🗑️ DELETE NOTE APPELÉE - ID:', id);
    
    if (!id) {
      console.error('❌ ID manquant');
      return;
    }

    try {
      const idToDelete = id.toString();// lzm nt2kdou kn l'id mt3na chaine de caractere ou non 
      console.log('🔄 ID à supprimer:', idToDelete);
      
      const newNotes = notes.filter(note => {
        const noteId = note.id.toString();
        const shouldKeep = noteId !== idToDelete;// shouldkeep c'est la note a supprimer
        
        if (!shouldKeep) {
          console.log('✅ NOTE TROUVÉE POUR SUPPRESSION:', note.title);
        }
        
        return shouldKeep;
      });

      console.log('📊 Résultat:', notes.length, '->', newNotes.length);
      
      if (newNotes.length === notes.length) {
        console.warn('⚠️ AUCUNE NOTE SUPPRIMÉE');
        console.log('🔍 IDs disponibles:', notes.map(n => n.id));
      } else {
        console.log('🎉 SUPPRESSION RÉUSSIE!');
      }

      setNotes(newNotes);
      await AsyncStorage.setItem('@myNotes_app', JSON.stringify(newNotes));
      
    } catch (error) {
      console.error('💥 ERREUR SUPPRESSION:', error);
    }
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};

// HOOK PERSONNALISÉ SIMPLIFIÉ : faciliter l'acces au contexte des notes dans n'importe quel composant
export const useNotes = () => {
  const context = useContext(NotesContext);//lire 
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};