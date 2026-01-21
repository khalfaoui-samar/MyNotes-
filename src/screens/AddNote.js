import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Alert, 
  ImageBackground,
  ScrollView
} from 'react-native';
import { useNotes } from '../data/NotesContext';

const AddNote = ({ navigation, route }) => {//navigation ll retour en arriere w route mthln fl modification bch y5ou les donnees l9dom
  const { addNote, updateNote } = useNotes();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ed65cbff'); // Couleur par défaut
  const [isEditing, setIsEditing] = useState(false);//kn false on ajoute sinon on modefie 
  const [editingId, setEditingId] = useState(null);

  // Palette de couleurs disponibles
  const colorPalette = [
    '#4CAF50', // Vert
    '#2196F3', // Bleu
    '#FF9800', // Orange
    '#9C27B0', // Violet
    '#F44336', // Rouge
    '#607D8B', // Gris bleu
    '#FFEB3B', // Jaune
    '#ed65cbff', // Cyan
  ];

  useEffect(() => {
    console.log('Params reçus:', route.params);// enou heya trj6lna fl modification chnia mktoub fi note 9bl
    
    if (route.params?.noteToEdit) {// verifie s'il y a une note deja a modifier
      const { noteToEdit } = route.params;//recupere tous les données
      console.log('Note à modifier:', noteToEdit);
      
      setTitle(noteToEdit.title || '');
      setContent(noteToEdit.content || '');
      setSelectedColor(noteToEdit.color || '#ed65cbff'); // Récupérer la couleur existante
      setIsEditing(true);// ngoulou ll app li nhna nmodifou mch bch n'ajoutou
      setEditingId(noteToEdit.id);// on garde le meme id pour savoir chnow note li bdlna feha
    } else {
      console.log('Mode création - aucune note à modifier');
      setIsEditing(false);//donc mthmmch note nmodifouha nwlou naamlou ajout
      setTitle('');
      setContent('');
      setSelectedColor('#ed65cbff'); // Reset à la couleur par défaut
    }
  }, [route.params]); // taaml mise a jour selon ahna chbch naamlou siwee modification siwee ajout

  const handleSave = () => { // kn rassina ala ajouter w baad ntf9dou champs fr8in wla lee
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir le titre et le contenu');
      return;
    }

    const noteData = {// creer une variable pour garger les informations
      title: title.trim(),
      content: content.trim(),
      color: selectedColor 
    };

    if (isEditing && editingId) {// si l' id mwjoud w note mwjouda alors on modifie la note 
      console.log('Modification note ID:', editingId);
      updateNote(editingId, noteData);
      Alert.alert('Succès', 'Note modifiée avec succès');
    } else {
      console.log('Création nouvelle note');
      addNote(noteData);
      Alert.alert('Succès', 'Note ajoutée avec succès');
    }

    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('Home');
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/backgroundajouter.png')} 
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView style={styles.container}>
        <Text style={styles.modeText}>
          {isEditing ? '✏️ Modifier la note' : '📝 Nouvelle note'}
        </Text>
        
        <TextInput
          style={styles.input}
          placeholder="Titre"
          value={title}
          onChangeText={setTitle}
          placeholderTextColor="#999"
        />
        
        <TextInput
          style={[styles.input, styles.contentInput]}
          placeholder="Laisse tes mots prendre vie…✨ "
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
          placeholderTextColor="#999"
        />

        {/* Sélecteur de couleur */}
        <View style={styles.colorSection}>
          <Text style={styles.colorLabel}>🎨 Couleur de la note</Text>
          <View style={styles.colorPalette}>
            {colorPalette.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,// style de cercle
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>
            {isEditing ? '💾 Modifier la note' : '💾 Enregistrer la note'}
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    padding: 26,
  },
  modeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30, // Correction: "margintop" -> "marginTop"
    color: '#c7c3c3ff',
    padding: 10,
    borderRadius: 8,
    paddingBottom: 70,
  },
  input: {
    padding: 20,
    borderRadius: 28,
    borderWidth: 1,
    marginBottom: 16,
    fontSize: 16,
    color: '#cac6c6ff',
  },
  contentInput: {
    height: 200,
    textAlignVertical: 'top',
  },
  colorSection: {
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 15,
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#070126ff',
    marginBottom: 10,
    textAlign: 'center',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: 'white',
    transform: [{ scale: 1.2 }],
  },
  checkmark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  selectedColorText: {
    fontSize: 12,
    color: '#c7c3c3ff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  saveButton: {
    backgroundColor: '#be8940ff',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#aaaaaaff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  debugText: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default AddNote;