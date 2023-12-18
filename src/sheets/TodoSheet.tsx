import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef, useState} from 'react';
import ActionSheet, {
  ActionSheetRef,
  SheetManager,
  SheetProps,
} from 'react-native-actions-sheet';
import {useDispatch} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {colors} from '../helpers/colors';
import {TodoType} from '../Types';
import {generateUUID} from '../helpers/createId';
import {AppDispatch} from '../store';
import {
  setAsyncStorageData,
  updateAsyncStorageData,
} from '../store/todoReducer';

import texts from '../helpers/Texts.json';

interface ITodoSheetProps {
  todo?: TodoType;
}

const TodoSheet = ({sheetId, payload}: SheetProps<ITodoSheetProps>) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const [title, setTitle] = useState(payload?.todo?.title || '');
  const [detail, setDetail] = useState(payload?.todo?.detail || '');
  const [selectedCategory, setSelectedCategory] = useState(
    payload?.todo?.category,
  );

  const dispatch = useDispatch<AppDispatch>();

  const categories = ['Home', 'School', 'Hobby', 'Other'];

  const addTodo = () => {
    if (detail && title && selectedCategory) {
      const newtoDo: TodoType = {
        id: generateUUID(),
        title: title,
        status: 'Waiting',
        category: selectedCategory,
        detail: detail,
      };
      dispatch(setAsyncStorageData(newtoDo));
      SheetManager.hide(sheetId);
    } else {
      Alert.alert('Be sure that every field is filled');
    }
  };
  const updateTodo = () => {
    if (detail && title && selectedCategory && payload?.todo) {
      const newtoDo: TodoType = {
        id: payload?.todo?.id,
        title: title,
        status: payload?.todo?.status,
        category: selectedCategory,
        detail: detail,
      };
      dispatch(updateAsyncStorageData(newtoDo));
      SheetManager.hide(sheetId);
    } else {
      Alert.alert('Be sure that every field is filled');
    }
  };

  return (
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      containerStyle={styles.container}
      indicatorStyle={styles.indicatorStyle}
      gestureEnabled={true}>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <Text style={styles.subTitle}>{texts.formHeadlines.title} :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={text => setTitle(text)}
            value={title}
            placeholder={texts.formHeadlines.details}
          />
        </View>
        <View style={[styles.input]}>
          <Text style={styles.subTitle}>{texts.formHeadlines.category} :</Text>
          <SelectDropdown
            data={categories}
            onSelect={selectedItem => {
              setSelectedCategory(selectedItem);
            }}
            buttonTextAfterSelection={selectedItem => {
              return selectedItem;
            }}
            rowTextForSelection={item => {
              return item;
            }}
            defaultValue={payload?.todo?.category}
            buttonStyle={styles.dropdown}
            buttonTextStyle={styles.dropdownText}
            dropdownStyle={styles.dropdownStyle}
            rowTextStyle={styles.rowTextStyle}
          />
        </View>
        <View style={styles.input}>
          <Text style={styles.subTitle}>{texts.formHeadlines.details} :</Text>
          <TextInput
            style={[styles.textInput, styles.multilinetextInput]}
            onChangeText={text => setDetail(text)}
            value={detail}
            placeholder={texts.formHeadlines.details}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          onPress={payload?.todo ? updateTodo : addTodo}
          style={styles.addButton}>
          <Text style={styles.buttonText}> ADD</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

export default TodoSheet;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  indicatorStyle: {
    width: 100,
    backgroundColor: colors.gray,
  },
  textInput: {
    height: 50,
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
  subTitle: {
    color: colors.darkGray,
    paddingVertical: 5,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: colors.gray,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
  },
  dropdownText: {
    textAlign: 'left',
    marginHorizontal: 0,
    fontSize: 14,
    color: colors.darkGray,
  },
  addButton: {
    width: '100%',
    backgroundColor: colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    paddingVertical: 10,
  },
  dropdownStyle: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  rowTextStyle: {
    color: colors.darkGray,
    fontSize: 15,
  },
});
