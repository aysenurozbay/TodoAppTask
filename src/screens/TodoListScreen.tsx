import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PlusIcon from '../icons/PlusSignIcon';
import {colors} from '../colors';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {TodoType} from '../Types';
import {todoSlice} from '../store/todoReducer';
import {generateUUID} from '../createId';
import {SheetManager} from 'react-native-actions-sheet';

const TodoListScreen = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const filteredTodos = useSelector(
    (state: RootState) => state.todos.filteredTodo,
  );
  const dispatch = useDispatch();

  const addTodo = () => {
    const newtoDo: TodoType = {
      id: generateUUID(),
      title: 'string',
      status: 'Done',
      category: 'Hobby',
      detail: 'string',
    };

    dispatch(todoSlice.actions.addTodo({todo: newtoDo}));
  };

  const filterTodo = () => {
    dispatch(todoSlice.actions.filterByCategory({category: 'Hobby'}));
  };
  const changeStatus = (toDoid: string) => {
    dispatch(
      todoSlice.actions.changeTodoStatus({id: toDoid, newStatus: 'Pending'}),
    );
  };

  return (
    <View style={styles.container}>
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

      <Button title="filter" onPress={filterTodo} />
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
