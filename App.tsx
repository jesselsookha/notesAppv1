//npx create-expo-app -t expo-template-blank-typescript
//cd notesAppv1
//cls
//npx expo install expo-file-system
//----------------------------------------------------------------------------

/*
import {useState , useEffect} from 'react'; 
import {
	StyleSheet, 
	Text, 
	View, 
	TextInput, 
	Button, 
	FlatList, 
	Alert
} from 'react-native'; 

import * as FileSystem from 'expo-file-system'; 
const FILE_PATH = FileSystem.documentDirectory + 'notes.json'; 

interface Note{
	id: string; 
	text: string; 
}

export default function App(){
	const [note, setNote] = useState<string>('');	
	const [notes, setNotes] = useState<Note[]>([]); 

	const loadNotes = async () => {
		try{
			const fileInfo = await FileSystem.getInfoAsync(FILE_PATH); 
			if (fileInfo.exists) {
				const fileContent = await FileSystem.readAsStringAsync(FILE_PATH); 
				setNotes(JSON.parse(fileContent));
			}
		} catch (error) {
			console.error('Error loading notes', error); 
		}
	}; 

	useEffect(() => {
		loadNotes();
	}, []);

	const handleAddNote = async () => {
		if (!note.trim()){ 
			Alert.alert('Error', 'Note cannot be empty');
			return; 
		}

		const newNote: Note = {id: Date.now().toString(), text: note};			
		const updatedNotes = [...notes, newNote]; 
		
		try {
			await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(updatedNotes));
			setNotes(updatedNotes); 
			setNote(''); 
		} catch (error) {
			console.error('Error saving note: ', error); 
		}	
	};

	const handleDeleteNote = async (id: string) => {};

	return(
		<View style={styles.container}>
			<TextInput 
				style={styles.input}
				placeholder="Enter your note"
				value={note}
				onChangeText={setNote}
			/> 
			<Button title="Add Note" onPress={handleAddNote} /> 
			<FlatList 
				data={notes}
				keyExtractor={item => item.id}
				renderItem={(item) => (
					<View style={styles.noteContainer}>
						<Text>{item.text}</Text>
						<Button title="Delete" onPress={() => handleDeleteNote(item.id) } />
					</View>
				)}	
			/>
		</View>
	);
}
*/

/*
** Original Code **
<FlatList 
  data={notes}
  keyExtractor={item => item.id}
  renderItem={(item) => (
    <View style={styles.noteContainer}>
      <Text>{item.text}</Text>
      <Button title="Delete" onPress={() => handleDeleteNote(item.id) } />
    </View>
  )}  
/>

Issues
1. Accessing item Properties:
	renderItem should receive an object with a structure that includes 
	the item property.
	In the original code, item is directly used assuming it directly 
	contains the properties of Note.

2. TypeScript Type:
	TypeScript expects renderItem to receive a parameter that is an 
	object with item as a property (among others like index).

** Corrected Code
const renderItem = ({ item }: { item: Note }) => (
  <View style={styles.noteContainer}>
    <Text>{item.text}</Text>
    <Button title="Delete" onPress={() => handleDeleteNote(item.id)} />
  </View>
);

<FlatList
  data={notes}
  keyExtractor={item => item.id}
  renderItem={renderItem}
/>

Explanation

- Parameter Destructuring:
-- Original: Assumes item is directly of type Note, which doesn’t align with 
how FlatList passes parameters.
-- Corrected: Uses object destructuring ({ item }) to extract item from the 
parameter, which matches the expected structure.

-TypeScript Expectations:
-- FlatList expects renderItem to handle an object with a property item, not 
the item directly. Hence, you need to destructure it properly to access the 
Note properties.

In summary, the main issue was how the item parameter was being handled in 
renderItem. The corrected approach uses object destructuring to correctly 
access the Note object properties, which aligns with TypeScript's expectations 
for FlatList's renderItem function. This ensures that TypeScript can accurately 
type-check your code and that your FlatList functions as expected.
*/


import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert
} from 'react-native';
import * as FileSystem from 'expo-file-system';

const FILE_PATH = FileSystem.documentDirectory + 'notes.json';

interface Note {
  id: string;
  text: string;
}

export default function App() {
  const [note, setNote] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const loadNotes = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(FILE_PATH);
      if (fileInfo.exists) {
        const fileContent = await FileSystem.readAsStringAsync(FILE_PATH);
        setNotes(JSON.parse(fileContent));
      }
    } catch (error) {
      console.error('Error loading notes', error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const handleAddNote = async () => {
    if (!note.trim()) {
      Alert.alert('Error', 'Note cannot be empty');
      return;
    }

    const newNote: Note = { id: Date.now().toString(), text: note };
    const updatedNotes = [...notes, newNote];

    try {
      await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
      setNote('');
    } catch (error) {
      console.error('Error saving note: ', error);
    }
  };

  const handleDeleteNote = async (id: string) => {
    // Handle deletion logic here
    const updatedNotes = notes.filter(note => note.id !== id);

    try {
      await FileSystem.writeAsStringAsync(FILE_PATH, JSON.stringify(updatedNotes));
      setNotes(updatedNotes);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const renderItem = ({ item }: { item: Note }) => (
    <View style={styles.noteContainer}>
      <Text>{item.text}</Text>
      <Button title="Delete" onPress={() => handleDeleteNote(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your note"
        value={note}
        onChangeText={setNote}
      />
      <Button title="Add Note" onPress={handleAddNote} />
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20, 
  },
  input: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    marginBottom: 10, 
    paddingHorizontal: 10, 
  },
  noteContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: 'gray',
  },
});
