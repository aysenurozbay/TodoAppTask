import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoType} from '../Types';
import {Alert} from 'react-native';

export const storeData = async (todo: TodoType) => {
  try {
    await AsyncStorage.setItem(todo.id, JSON.stringify(todo));
  } catch (e) {}
};
export const updateData = async (newData: TodoType) => {
  try {
    const existingData = await AsyncStorage.getItem(newData.id);

    if (existingData !== null) {
      const parsedExistingData = JSON.parse(existingData);

      const updatedData = {
        ...parsedExistingData,
        ...newData,
      };

      await AsyncStorage.setItem(newData.id, JSON.stringify(updatedData));
    } else {
    }
  } catch (error) {
    Alert.alert('Veri güncellenirken bir hata oluştu:');
  }
};

export const getData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const todoItems = await AsyncStorage.multiGet(keys);
    const todos: TodoType[] = todoItems
      .filter(item => item[1] !== null)
      .map(item => JSON.parse(item[1]!));
    return todos;
  } catch (error) {
    return [];
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {}
};
