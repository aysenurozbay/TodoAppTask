import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TodoType} from '../Types';

const ToDoItemComponent = (item: TodoType) => {
  return (
    <View>
      <Text>{item.title}</Text>
    </View>
  );
};

export default ToDoItemComponent;

const styles = StyleSheet.create({});
