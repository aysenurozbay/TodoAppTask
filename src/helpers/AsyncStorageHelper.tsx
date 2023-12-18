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
export const updateData = async (newData: TodoType) => {
  try {
    // Mevcut veriyi al
    const existingData = await AsyncStorage.getItem(newData.id);

    if (existingData !== null) {
      // Mevcut veriyi JSON formatından çıkar
      const parsedExistingData = JSON.parse(existingData);

      // Yeni veriyi mevcut veriyle birleştir veya değiştir
      const updatedData = {
        ...parsedExistingData,
        ...newData,
      };

      // Güncellenmiş veriyi sakla
      await AsyncStorage.setItem(newData.id, JSON.stringify(updatedData));
      console.log('Veri başarıyla güncellendi.');
    } else {
      console.log('Belirtilen anahtarda kayıtlı veri bulunamadı.');
    }
  } catch (error) {
    console.error('Veri güncellenirken bir hata oluştu:', error);
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
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Anahtar "${key}" ile ilişkili öğe başarıyla silindi.`);
  } catch (error) {
    console.error('Öğe silinirken bir hata oluştu:', error);
  }
};
