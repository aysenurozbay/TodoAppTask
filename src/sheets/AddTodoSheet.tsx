import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {colors} from '../colors';
import DropDownPicker from 'react-native-dropdown-picker';
import {TodoType} from '../Types';
import {generateUUID} from '../createId';
import {useDispatch} from 'react-redux';
import {setAsyncStorageData, todoSlice} from '../store/todoReducer';
import {AppDispatch} from '../store';

const AddTodoSheet = (props: SheetProps) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const [items, setItems] = useState([
    {label: 'Home', value: 'Home'},
    {label: 'School', value: 'School'},
    {label: 'Hobby', value: 'Hobby'},
    {label: 'Other', value: 'Other'},
  ]);

  const addTodo = () => {
    if (detail && title && selectedCategory) {
      const newtoDo: TodoType = {
        id: generateUUID(),
        title: title,
        status: 'Waiting',
        category: selectedCategory,
        detail: detail,
      };
      // dispatch(todoSlice.actions.addTodo({todo: newtoDo}));
      dispatch(setAsyncStorageData(newtoDo));

      SheetManager.hide(props.sheetId);
    } else {
      Alert.alert('Be sure that every field is filled');
    }
  };

  return (
    <ActionSheet
      id={props.sheetId}
      ref={actionSheetRef}
      containerStyle={styles.container}
      indicatorStyle={styles.indicatorStyle}
      gestureEnabled={true}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}> NEW TODO</Text>
        <View style={styles.input}>
          <Text style={styles.subTitle}> Title : </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder="Insert your text!"
          />
        </View>
        <View style={[styles.input, {zIndex: 100}]}>
          <Text style={styles.subTitle}> Title : </Text>
          <DropDownPicker
            open={open}
            value={selectedCategory}
            items={items}
            setOpen={setOpen}
            setValue={setSelectedCategory}
            setItems={setItems}
            containerProps={{}}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.subTitle}> Title : </Text>
          <TextInput
            style={[styles.textInput, styles.multilinetextInput]}
            onChangeText={text => setDetail(text)}
            value={detail}
            placeholder="Insert your text!"
            multiline={true}
          />
        </View>
        <Button title="Add" onPress={addTodo} />
      </View>
    </ActionSheet>
  );
};

export default AddTodoSheet;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 10,
    // height: metrics.screenHeight - 60,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  indicatorStyle: {
    width: 100,
    backgroundColor: colors.gray,
  },
  textInput: {
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  multilinetextInput: {
    height: 100,
  },
  inputContainer: {
    paddingVertical: 10,
  },
  input: {
    paddingVertical: 10,
  },
  title: {
    color: colors.orange,
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: '600',
  },
  subTitle: {
    color: colors.darkGray,
    paddingVertical: 5,
  },
});
