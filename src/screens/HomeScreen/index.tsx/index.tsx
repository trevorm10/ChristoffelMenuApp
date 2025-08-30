import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

type MenuItem = {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
};

const COURSES = ['Starters', 'Mains', 'Dessert'];

type HomeScreenProps = {
  navigation: any;
  menuItems: MenuItem[];
  addMenuItem: (item: MenuItem) => void;
};

export default function HomeScreen({ navigation, menuItems, addMenuItem }: HomeScreenProps) {
  const countAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(countAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(countAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [menuItems]);

  const averagePrices = COURSES.reduce<Record<string, number>>((acc, course) => {
    const filtered = menuItems.filter((item) => item.course === course);
    if (filtered.length === 0) {
      acc[course] = 0;
    } else {
      const sum = filtered.reduce((total, item) => total + parseFloat(item.price), 0);
      acc[course] = +(sum / filtered.length).toFixed(2);
    }
    return acc;
  }, {});

  type NewType = unknown;

  return (
    <SafeAreaView <NewType>styles={styles.container}>
      <Text <unknown>styles={styles.title}>Christoffel's Menu</Text>

      <Animated.Text
        styles={[
          styles.count,
          {
            transform: [
              {
                scale: countAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.3],
                }),
              },
            ],
          },
        ]}
      >
        Total Items: {menuItems.length}
      </Animated.Text>

      <View styles={styles.averageContainer}>
        {COURSES.map((course) => (
          <Text key={course} styles={styles.averageText}>
            Avg {COURSES}: R{averagePrices[COURSES]}
          </Text>
        ))}
      </View>

      {menuItems.length === 0 ? (
        <Text style={styles.noItems}>No menu items yet. Please add some!</Text>
      ) : (
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <Text style={styles.dishName}>
                {item.dishName} (R{item.price})
              </Text>
              <Text>{item.description}</Text>
              <Text style={styles.courseLabel}>{item.course}</Text>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigator.navigate('AddItem')}
      >
        <Text style={styles.addButtonText}>Add Menu Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
  count: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  averageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
  },
  noItems: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 24,
    fontSize: 16,
  },
  menuItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseLabel: {
    marginTop: 8,
    fontStyle: 'italic',
    color: '#555',
  },
  addButton: {
    backgroundColor: '#4a90e2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});