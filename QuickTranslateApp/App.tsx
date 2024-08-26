import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList, ScrollView } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import uuid from 'react-native-uuid';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(["VirtualizedLists should never be nested"])

export default function App() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [conversationId, setConversationId] = useState(uuid.v4() as string);
  const [history, setHistory] = useState<string[]>([]);
  const [openSource, setOpenSource] = useState(false);
  const [openTarget, setOpenTarget] = useState(false);
  const [languages, setLanguages] = useState([
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Spanish', value: 'es' },
    { label: 'German', value: 'de' },
    { label: 'Turkish', value: 'tr' },
  ]);

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://192.168.0.20:8000/translate/', {
        text,
        src_lang: sourceLanguage,
        tgt_lang: targetLanguage,
        mode: 'online',
        conversation_id: conversationId,
      });

      const newTranslation = response.data.translated_text;

      // Store the current translation in history
      if (translatedText) {
        setHistory((prevHistory) => [...prevHistory, translatedText]);
      }

      // Update the translated text with the new translation
      setTranslatedText(newTranslation);
    } catch (error) {
      Alert.alert('Error', 'Translation failed. Please try again.');
    }
  };

  const handleLanguageChange = (type: 'source' | 'target', value: string) => {
    if (type === 'source') {
      setSourceLanguage(value);
    } else {
      setTargetLanguage(value);
    }
    // Generate a new conversation_id whenever language changes
    setConversationId(uuid.v4() as string);
    setTranslatedText(''); // Clear the current translation
    setHistory([]); // Clear the history
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>QuickTranslate</Text>

      <View style={styles.languagePickerContainer}>
        <DropDownPicker
          open={openSource}
          value={sourceLanguage}
          items={languages}
          setOpen={setOpenSource}
          setValue={setSourceLanguage}
          setItems={setLanguages}
          containerStyle={styles.picker}
          zIndex={5000}
          zIndexInverse={6000}
        />

        <DropDownPicker
          open={openTarget}
          value={targetLanguage}
          items={languages}
          setOpen={setOpenTarget}
          setValue={setTargetLanguage}
          setItems={setLanguages}
          containerStyle={styles.picker}
          zIndex={4000}
          zIndexInverse={5000}
        />
      </View>

      <TextInput
        style={styles.textInput}
        placeholder="Enter text to translate"
        value={text}
        onChangeText={(t) => setText(t)}
        multiline={true}
      />

      <Button title="Translate" onPress={handleTranslate} />

      <Text style={styles.resultLabel}>Translation:</Text>
      <Text style={styles.result}>{translatedText}</Text>

      {history.length > 0 && (
        <>
          <Text style={styles.historyLabel}>History:</Text>
          <FlatList
            data={history}
            renderItem={({ item }) => <Text style={styles.historyItem}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40, // Added marginTop to lower the position
  },
  languagePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    zIndex: 5000, // Ensure dropdowns appear above other elements
  },
  picker: {
    flex: 1,
    marginHorizontal: 5,
    zIndex: 10,
  },
  textInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  resultLabel: {
    fontSize: 18,
    marginTop: 20,
  },
  result: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  historyLabel: {
    fontSize: 18,
    marginTop: 20,
  },
  historyItem: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});
