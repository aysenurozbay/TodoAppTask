import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {SheetManager} from 'react-native-actions-sheet';

import {TodoType} from '../Types';
import {colors} from '../helpers/colors';
import {AppDispatch} from '../store';

import {
  deleteAsyncStorageData,
  fetchInitialData,
  updateAsyncStorageData,
} from '../store/todoReducer';

import DoneIcon from '../icons/DoneIcon';
import EditIcon from '../icons/EditIcon';
import CrossIcon from '../icons/CrossIcon';

interface ITodoItemComponentProps {
  item: TodoType;
}
const TodoItemComponent = ({item}: ITodoItemComponentProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const deleteTodo = () => {
    dispatch(deleteAsyncStorageData(item.id));
    dispatch(fetchInitialData());
  };
  const changeStatus = (newStatus: 'Done' | 'Waiting') => {
    const updatedStatus = {...item, status: newStatus};
    dispatch(updateAsyncStorageData(updatedStatus));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.detail}> - {item.detail}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.statusButtonContainer}
          onPress={deleteTodo}>
          <CrossIcon fill={colors.red} size={25} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.statusButtonContainer}
          onPress={() =>
            SheetManager.show('todo-sheet', {payload: {todo: item}})
          }>
          <EditIcon fill={colors.yellow} size={25} />
        </TouchableOpacity>
        {item.status === 'Waiting' && (
          <TouchableOpacity
            style={styles.statusButtonContainer}
            onPress={() => changeStatus('Done')}>
            <DoneIcon fill={colors.green} size={25} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TodoItemComponent;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.white,
    marginVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: colors.red,
    fontSize: 15,
    fontWeight: '700',
  },
  detail: {
    paddingVertical: 5,
    color: colors.darkGray,
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButtonContainer: {
    paddingLeft: 15,
  },
});
