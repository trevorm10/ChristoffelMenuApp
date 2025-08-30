import React, { useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

type MenuItem = {
  id: string
  dishName: string
  description: string
  course: string
  price: string
}

const COURSES = ['Starters', 'Mains', 'Dessert'];

type GuestFilterScreenProps = {
  navigation: any
  menuItems: MenuItem[]
}

export default function GuestFilterScreen({ navigation, menuItems }: GuestFilterScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredItems = selectedCourse ? menuItems.filter(i => i.course === selectedCourse) : menuItems;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filter Menu by Course</Text>

      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity 
          style={[styles.filterButton, selectedCourse === null && styles.filterButtonSelected]} 
          onPress={() => setSelectedCourse(null)}>
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>

        {COURSES.map(course => (
          <TouchableOpacity 
            key={course} 
            style={[styles.filterButton, selectedCourse === course && styles.filterButtonSelected]}
            onPress={() => setSelectedCourse(course)}>
            <Text style={styles.filterButtonText}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredItems.length === 0 ? (
        <Text style={styles.noItemsText}>No items in this category.</Text>
      ) : (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>{item.dishName} (R{item.price})</Text>
              <Text>{item.description}</Text>
              <Text style={styles.courseLabel}>{item.course}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 26, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 },
  filterButtonsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' },
  filterButton: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#ccc', borderRadius: 20, marginHorizontal: 6, marginVertical: 4 },
  filterButtonSelected: { backgroundColor: '#4a90e2' },
  filterButtonText: { color: '#000', fontSize: 16 },
  noItemsText: { textAlign: 'center', marginTop: 50, color: '#666', fontSize: 16 },
  menuItem: { borderWidth: 1, borderColor: '#ccc', padding: 14, borderRadius: 6, marginBottom: 12 },
  dishName: { fontWeight: 'bold', fontSize: 18 },
  courseLabel: { marginTop: 6, fontStyle: 'italic', color: '#555' },
  backButton: { backgroundColor: '#4a90e2', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  backButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
});