import {Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {SheetManager} from 'react-native-actions-sheet';
import {colors} from '../helpers/colors';
import PlusIcon from '../icons/PlusSignIcon';

const TitleComponent = () => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.title}> TODO LIST</Text>
      <TouchableOpacity
        onPress={() => SheetManager.show('todo-sheet')}
        style={styles.addButton}>
        <PlusIcon fill={colors.orange} size={30} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TitleComponent;
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  title: {
    color: colors.orange,
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {},
});
