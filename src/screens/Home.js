import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {View,Text,FlatList,TouchableOpacity,StyleSheet,TextInput,Alert,ImageBackground,Dimensions}
from 'react-native';
import { useNotes } from '../data/NotesContext';

const { width } = Dimensions.get('window');//t3tina taille de l'ecran lkol
const CARD_MARGIN = 8; 
const CARD_WIDTH = (width - CARD_MARGIN * 4) / 2;

const Home = ({ navigation }) => {

  const { notes, deleteNote } = useNotes();

  const [searchQuery, setSearchQuery] = useState('');// use state heya variable ttbdl dans le temps 
         //searchQuery feha chnow nktbou fl barre de recherche 
  const [sortOrder, setSortOrder] = useState('newest');
           // set ... fonction pour mettre a jour les valeurs hedhom
  // Background image
  const backgroundImage = require('../../assets/background.png');
  // Bouton flottant Ajouter
  const addButtonImage = require('../../assets/ajouter.png');

  // ─────────────────────────────────────────────
  // Chargement initial
  // ─────────────────────────────────────────────
  if (!notes) {
    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>veuillez d'abord ajouter des notes !</Text>
            </View>
            
            {/* Bouton flottant Ajouter */}
            <TouchableOpacity 
            style={styles.floatingAddButton}
            onPress={() => navigation.navigate('AddNote')}>

                <ImageBackground 
                source={addButtonImage} 
                style={styles.floatingAddButtonImage}
                resizeMode="contain"/> {/*l'image bch twli redimentionnée m8ir ma tt9as mnha htta chy */}
                
            </TouchableOpacity>
        </ImageBackground>
    );
  };

  // ─────────────────────────────────────────────
  // Filtrer les notes
  // ─────────────────────────────────────────────
  const filteredNotes = notes.filter(note => { // bch naaamlou lista jdida mais marra hedhi seulement les notes li corresponds ll critére 
    if (!note) return false;

    const title = note.title || '';// ncharchi bl esm sinon n5liha chaine vide w nt3da ncharchi bl contenue 
    const content = note.content || '';
    const query = searchQuery.toLowerCase();// mettre tout en miniscule 

    return (
      title.toLowerCase().includes(query) ||
      content.toLowerCase().includes(query)// taatina vrai si whda fehom all9l mchet maa li ktbnech w ttzed llista jdida t3na 
    );
  });

  // ─────────────────────────────────────────────
  // Trier les notes
  // ─────────────────────────────────────────────
  const sortedNotes = [...filteredNotes].sort((a, b) => {// en fait hnee nsn3ou copie o5ra mi tbleau bch ma nmodifouch l'originnal w . sort taaml tri selon chnia fnct donnée et a et b deux notes a comparer a la fois
    switch (sortOrder) {
      case 'newest':
        return parseInt(b.id) - parseInt(a.id);
      case 'oldest':
        return parseInt(a.id) - parseInt(b.id);
      case 'alphabetical':
        return (a.title || '').toLowerCase().localeCompare((b.title || '').toLowerCase());
      default:
        return 0;
    }
  });

  // ─────────────────────────────────────────────
  // Suppression
  // ─────────────────────────────────────────────
  const handleDelete = (id, title) => {
  console.log('🎯 HandleDelete appelée - ID:', id);
  
  const confirmed = window.confirm(`Voulez-vous supprimer "${title}" ?`);// boite de dialogue pour confirmer la supression
  
  if (confirmed) {
    console.log('✅ User a confirmé la suppression');
    deleteNote(id);
  } else {
    console.log('❌ User a annulé la suppression');
  }
};

  // ─────────────────────────────────────────────
  // Modification
  // ─────────────────────────────────────────────
  const handleEdit = (note) => {
    if (note?.id) {// varifier si note et note.id existe 
      navigation.navigate('AddNote', { noteToEdit: note });
    } else {
      Alert.alert('Erreur', 'Impossible de modifier cette note');
    }
  };
  // ytbdel esm lbouton ki nros 
  const getSortButtonText = () => {
    switch (sortOrder) {
      case 'newest': return '📅 Récentes';
      case 'oldest': return '📅 Anciennes';
      case 'alphabetical': return '🔤 A-Z';
      default: return 'Trier';
    }
  };

  // ─────────────────────────────────────────────
  // Aucune note (sans recherche et sans tri)
  // ─────────────────────────────────────────────
  if (sortedNotes.length === 0 && !searchQuery) {
    return (
       <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Mes Notes</Text>
                </View>

                {/* Recherche + tri */}
                <View style={styles.searchSortContainer}>
                    <TextInput style={styles.searchInput} placeholder="🔍 Rechercher..." value={searchQuery} onChangeText={setSearchQuery} /> {/* valeur actuelle fi champ w le5ra yaani ki l'utilisateur yd5l hja heya taaml mise a jour w tfss5 lplaceholder*/}
                    <TouchableOpacity
                        style={styles.sortButton}
                        onPress={() => {
                            const orders = ['newest', 'oldest', 'alphabetical'];
                            const next = (orders.indexOf(sortOrder) + 1) % orders.length;
                            setSortOrder(orders[next]);
                        }}
                    >
                        <Text style={styles.sortButtonText}>{getSortButtonText()}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>📝 Aucune note disponible</Text>
                    <Text style={styles.emptySubText}>Cliquez sur le bouton + en bas pour créer votre première note ! </Text>
                </View>
            </View>
            
            {/* Bouton flottant Ajouter */}
            <TouchableOpacity 
            style={styles.floatingAddButton}
            onPress={() => navigation.navigate('AddNote')} >
                <ImageBackground 
                    source={addButtonImage} 
                    style={styles.floatingAddButtonImage}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </ImageBackground>
    );
  };

  // ─────────────────────────────────────────────
  // Affichage normal
  // ─────────────────────────────────────────────
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.contentContainer}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Mes Notes</Text>
          <Text style={styles.phraseHeader}>Une idée te chuchote quelque chose ? Écris-le avant d'oublier son secret ✨📒💫</Text>
        </View>

        {/* Recherche + tri */}
        <View style={styles.searchSortContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />

          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => {
              const orders = ['newest', 'oldest', 'alphabetical'];
              const next = (orders.indexOf(sortOrder) + 1) % orders.length;
              setSortOrder(orders[next]);
            }}
          >
            <Text style={styles.sortButtonText}>{getSortButtonText()}</Text>
          </TouchableOpacity>
        </View>

        {/* Résultat de recherche */}
        {searchQuery && (
          <Text style={styles.searchIndicator}>
            {sortedNotes.length} note{sortedNotes.length > 1 ? 's' : ''} trouvée{sortedNotes.length > 1 ? 's' : ''}
          </Text>
        )}

        {/* Liste */}
        <FlatList
          data={sortedNotes}
          keyExtractor={(item) => item?.id?.toString() || Math.random().toString()}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>🔍 Aucune note trouvée</Text>
              <Text style={styles.emptySubText}>Essayez avec d'autres mots-clés</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[
              styles.noteCard,
              { borderLeftColor: item.color || '#4CAF50' } // Utiliser la couleur de la note
            ]}>

              <View style={styles.noteContent}>
                {/* En-tête avec titre et indicateur de couleur */}
                <View style={styles.noteHeader}>
                  <Text style={styles.noteTitle}>{item.title || 'Sans titre'}</Text>
                  <View style={[
                    styles.colorIndicator,
                    { backgroundColor: item.color || '#4CAF50' }
                  ]} />
                </View>

                <Text style={styles.noteContentText} numberOfLines={2}>
                  {item.content || 'Aucun contenu'}
                </Text>

                <Text style={styles.noteDate}>📅 {item.date || 'Date inconnue'}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEdit(item)}
                >
                  <Text style={styles.buttonText}>✏️ Modifier</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(item?.id, item?.title)}
                >
                  <Text style={styles.buttonText}>🗑️ Supprimer</Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        />

      </View>
      
      {/* Bouton flottant Ajouter */}
      <TouchableOpacity 
        style={styles.floatingAddButton}
        onPress={() => navigation.navigate('AddNote')}
      >
        <ImageBackground 
          source={addButtonImage} 
          style={styles.floatingAddButtonImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ImageBackground>
  );
};

// ─────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  contentContainer: {
    flex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 30
  },
  headerText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'left',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3
  },
  phraseHeader:{
    color:'#c99e76ff',
    fontSize:16,
    textAlign:'left',
    marginTop:20
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 50,
    gap: 12
  },
  searchInput: {
    flex: 1,
    padding: 12,
    borderRadius: 30,
    borderWidth: 1,
    fontSize: 16,
    color: '#848484ff',
  },
  sortButton: {
    backgroundColor: 'rgba(43,107,157,0.9)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },

  noteCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 38,
    borderLeftWidth: 12,
    padding: 16,
    alignItems: 'center'
  },

  noteContent: { flex: 1 },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  noteTitle: { 
    fontWeight: 'bold', 
    fontSize: 16, 
    color: '#333',
    flex: 1,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
  noteContentText: { color: '#666', marginBottom: 8, lineHeight: 20 },
  noteDate: { marginTop: 8, color: '#888', fontSize: 12, fontStyle: 'italic' },

  buttonContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    gap: 8
  },
  editButton: {
    backgroundColor: '#3483c3ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  deleteButton: {
    backgroundColor: '#d47217ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40
  },
  emptyText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '500',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  emptySubText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },

  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchIndicator: {
    textAlign: 'center',
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  // Bouton flottant Ajouter
  floatingAddButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  floatingAddButtonImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Home;