import { View, Text, Pressable} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import style from "../styles/styles";

let board=[];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;

const START = "dice-multiple";


export default function Gameboard() {

    const [nbrOfThrowsLeft,setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status,setStatus]=useState("");
    const [selectedDices,setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false))

    function getDiceColor(i) {
        if (board.every((val,i,arr)=> val === arr[0])){
            return "orange";
        } else {
            return selectedDices[i] ? "black" : "steelblue";
        }
    }

        function selectDice(i) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false: true;
            setSelectedDices(dices);
        }

 const throwDices = () => {

    for (let i = 0; i < NBR_OF_DICES; i++) {
        if(!selectedDices[i]){
            let randomNumber = Math.floor(Math.random() * 6+1);
            board[i] = "dice-" + randomNumber;
        }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    }

function checkWinner() {
    if(board.every((val,i,arr) => val === arr[0]) && nbrOfThrowsLeft > 0){
        setStatus("You won");
    }else if (board.every((val,i,arr) => val === arr[0]) && nbrOfThrowsLeft === 0){
        setStatus("You won, game over");
        setSelectedDices(new Array(NBR_OF_DICES).fill(false))
} else if (nbrOfThrowsLeft === 0 ) {
    setStatus("Game over");
    setSelectedDices(new Array(NBR_OF_DICES).fill(false));
}else {
    setStatus("Keep on throwing")
}
}

useEffect(()=> {
    checkWinner();
    if(nbrOfThrowsLeft === NBR_OF_THROWS){
        setStatus("Game has not started")
    }
    if(nbrOfThrowsLeft < 0) {
        setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
},[nbrOfThrowsLeft]);

 const row = [];
for(let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
        <Pressable
            key={"row" + i}
            onPress={()=> selectDice(i)}>
    <MaterialCommunityIcons
        name={board[i]}
        key={"row" + i}
        size={50}
        color={getDiceColor(i)}>
    </MaterialCommunityIcons>
    </Pressable>
);
}

    return (
        <View style={style.gameboard}>
          <View style={style.flex}></View>
      <Text>{row}</Text>

      <Text style={style.gameinfo}>Heittoja jäljellä: {nbrOfThrowsLeft}</Text>
      <Text style={style.gameinfo}>{status}</Text>
      <Pressable style={style.button}
        onPress={() => throwDices()}>
            <Text style={style.buttonText}>Heitä noppia</Text>
        </Pressable>
    </View>
  )
}