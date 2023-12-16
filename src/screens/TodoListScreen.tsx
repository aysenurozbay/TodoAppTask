import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {GeneralNavigationParamList, TodoType} from '../Types';
import {todoSlice} from '../store/todoReducer';

import {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';

type CategoryTabScreenProps =
  MaterialTopTabScreenProps<GeneralNavigationParamList>;

const TodoListScreen = ({route}: CategoryTabScreenProps) => {
  console.log('first', route.params);
  const dispatch = useDispatch();

  const status = 'burda';

  // useEffect(() => {
  //   dispatch(todoSlice.actions.filterByStatus({status: status}));
  // }, [status, dispatch]);

  const todos = useSelector((state: RootState) => state.todos.filteredTodo);
  // const filteredTodos = useSelector(
  //   (state: RootState) => state.todos.filteredTodo,
  // );

  // const addTodo = () => {
  //   const newtoDo: TodoType = {
  //     id: generateUUID(),
  //     title: 'string',
  //     status: 'Done',
  //     category: 'Hobby',
  //     detail: 'string',
  //   };

  //   dispatch(todoSlice.actions.addTodo({todo: newtoDo}));

  useEffect(() => {
    dispatch(todoSlice.actions.filterByStatus({status: status}));
  }, [dispatch, status]);

  const filterTodo = () => {
    dispatch(todoSlice.actions.filterByStatus({status: status}));
  };
  const changeStatus = (toDoid: string) => {
    dispatch(
      todoSlice.actions.changeTodoStatus({id: toDoid, newStatus: 'Pending'}),
    );
  };

  return (
    <View style={styles.container}>
      <Button title="filter" onPress={filterTodo} />

      {todos && (
        <FlatList
          data={todos}
          renderItem={({item}: {item: TodoType}) => (
            <TouchableOpacity onPress={() => changeStatus(item.id)}>
              <Text>
                {item.title} - {item.category} - {item.status}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item: TodoType) => item.id}
        />
      )}
    </View>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
