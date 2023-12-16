import AsyncStorage from '@react-native-async-storage/async-storage';
import {TodoType} from '../Types';

export const storeData = async (todo: TodoType) => {
  try {
    console.log('burda');
    await AsyncStorage.setItem(todo.id, JSON.stringify(todo));
  } catch (e) {
    console.error('Durum kaydedilemedi:', e);
    // saving error
  }
};

export const getData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();

    const todoItems = await AsyncStorage.multiGet(keys);

    const todos: TodoType[] = todoItems.map(item => JSON.parse(item[1]));

    return todos;
  } catch (error) {
    console.error('Veri alınamadı:', error);
    return 0;
  }
};
export const updateData = async (todo: TodoType) => {
  try {
    // const value = await getData();

    storeData(todo);
  } catch (error) {
    console.error('Veri alınamadı:', error);
    return null;
  }
};
