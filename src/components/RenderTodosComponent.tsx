import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TodoType} from '../Types';
import TodoItemComponent from './TodoItemComponent';
import {colors} from '../helpers/colors';

type GroupedTodos = {
  [key in TodoType['category']]?: TodoType[];
};

interface IRenderTodosComponentProps {
  todos: TodoType[];
}
const RenderTodosComponent = ({todos}: IRenderTodosComponentProps) => {
  const groupedTodos: GroupedTodos = todos.reduce(
    (grouped: GroupedTodos, todo: TodoType) => {
      const {category} = todo;
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category]?.push(todo);
      return grouped;
    },
    {},
  );
  return (
    <>
      {Object.keys(groupedTodos).map(category => (
        <View key={category} style={styles.todoContainer}>
          <Text style={styles.categoryTitle}>{category} Todos :</Text>
          {groupedTodos[category as TodoType['category']]?.map(todo => (
            <TodoItemComponent item={todo} key={todo.id} />
          ))}
        </View>
      ))}
    </>
  );
};

export default RenderTodosComponent;

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 14,
    color: colors.darkGray,
    marginLeft: 7,
  },
  todoContainer: {
    paddingVertical: 7,
  },
});
