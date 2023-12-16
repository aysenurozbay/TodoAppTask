import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../colors';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../store';
import {GeneralNavigationParamList, TodoType} from '../Types';
import {fetchInitialData, todoSlice} from '../store/todoReducer';

import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import {getData, storeData} from '../helpers/AsyncStorageHelper';
import {generateUUID} from '../createId';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoListScreen from './TodoListScreen';

type CategoryTabScreenProps =
  MaterialTopTabScreenProps<GeneralNavigationParamList>;

const AllTodoListScreen = ({}: CategoryTabScreenProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(todoSlice.actions.filterByStatus({status: status}));
  // }, [status, dispatch]);

  const todos = useSelector((state: RootState) => state.todos.todos);
  // const filteredTodos = useSelector(
  //   (state: RootState) => state.todos.filteredTodo,
  // );

  const addTodo = () => {
    const newtoDo: TodoType = {
      id: generateUUID(),
      title: 'string',
      status: 'Done',
      category: 'Hobby',
      detail: 'string',
    };
    storeData(newtoDo);
    // dispatch(todoSlice.actions.addTodo({todo: newtoDo}));
  };

  const changeStatus = (toDoid: string) => {
    dispatch(
      todoSlice.actions.changeTodoStatus({id: toDoid, newStatus: 'Pending'}),
    );
  };

  React.useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Button title="add" onPress={addTodo} />
      <Button title="add" onPress={() => AsyncStorage.clear()} />
      {todos && (
        <FlatList
          data={todos}
          renderItem={({item}: {item: TodoType}) => (
            <TodoListScreen item={item} />
          )}
          keyExtractor={(item: TodoType) => item.id}
        />
      )}
    </View>
  );
};

export default AllTodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
