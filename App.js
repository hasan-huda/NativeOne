import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [goalList, setGoalList] = useState([]);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function startAddGoalHandler(){
    setModalIsVisible(true);
  }

  function endAddGoalHandler(){
    setModalIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setGoalList((currentGoalList) => [
      ...currentGoalList,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
  }

  function deleteItemHandler(id) {
    setGoalList(currentGoalList => {
      return currentGoalList.filter((goal)=> goal.id!==id);
    })
  }

  return (

    <>
    <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoalHandler}/>
        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} endAddGoalHandler={endAddGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList
            data={goalList}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteItemHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 70,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#1e085a',
  },

  goalsContainer: {
    flex: 5,
    padding: 10,
  },
});
