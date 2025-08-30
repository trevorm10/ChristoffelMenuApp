import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type AddItemScreenProps = {
  navigation: any;
  addMenuItem: (item: MenuItem) => void;
};

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const COURSES = ['Starters', 'Mains', 'Dessert'];

export default function AddItemScreen({ navigation, addMenuItem }: AddItemScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(COURSES[0]);
  const [price, setPrice] = useState('');

  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const handleAdd = () => {
    if (!dishName.trim() || !description.trim() || !price.trim() || isNaN(parseFloat(price))) {
      alert('Please enter valid dish name, description, and numeric price.');
      return;
    }

    const newItem: MenuItem = {
      id: generateId(),
      dishName,
      description,
      course,
      price,
    };

    addMenuItem(newItem);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Add Menu Item</Text>

      <Text style={styles.label}>Dish Name:</Text>
      <TextInput
        style={styles.input}
        value={dishName}
        onChangeText={setDishName}
        placeholder="Enter dish name"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>Course:</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={course} onValueChange={setCourse}>
          {COURSES.map((c) => (
            <Picker.Item label={c} value={c} key={c} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Price (R):</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        placeholder="e.g., 100.00"
        keyboardType="numeric"
      />

      <View style={styles.buttonRow}>
        <Button title="Add" onPress={handleAdd} />
        <Button title="Cancel" color="#888" onPress={() => navigation.goBack()} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 6,
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
});
