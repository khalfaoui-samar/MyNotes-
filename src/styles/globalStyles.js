import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f8f9fa',
  },
  
  // Cartes de notes - STYLE CORRIGÉ
  noteCard: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    minHeight: 120, // Hauteur minimale
  },
  
  // Textes - STYLE CORRIGÉ
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  content: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    lineHeight: 20,
    flexShrink: 1, // Empêche le débordement
  },
  date: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  
  // Boutons des cartes
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 'auto', // Pousse les boutons vers le bas
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  
  // Bouton d'ajout principal
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Champs de formulaire
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  
  // Bouton de sauvegarde
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Message vide
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
    padding: 20,
  },
  // Ajoutez à la fin de votre globalStyles.js
searchSortContainer: {
  flexDirection: 'row',
  marginBottom: 15,
  gap: 10,
},
searchInput: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 12,
  fontSize: 16,
  borderRadius: 8,
  backgroundColor: 'white',
},
sortButton: {
  backgroundColor: '#FF9800',
  paddingHorizontal: 15,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 100,
},
sortButtonText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 14,
},
sortIndicator: {
  fontSize: 12,
  color: '#666',
  textAlign: 'center',
  marginBottom: 10,
  fontStyle: 'italic',
},
});