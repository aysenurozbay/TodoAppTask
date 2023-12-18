import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/native';

import {AppParams} from '../Types';
import {AppDispatch, RootState} from '../store';
import {fetchInitialData} from '../store/todoReducer';
import RenderTodosComponent from '../components/RenderTodosComponent';

type WaitingScreenRouteProp = RouteProp<AppParams, 'Waiting' | 'Done'>;

type WaitingScreenProps = {
  route: WaitingScreenRouteProp;
};

const TodoListScreen = ({route}: WaitingScreenProps) => {
  const {statusType} = route.params;

  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const filteredTodos = todos.filter(todo => todo.status === statusType);

  React.useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <RenderTodosComponent todos={filteredTodos} />
    </ScrollView>
  );
};

export default TodoListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
