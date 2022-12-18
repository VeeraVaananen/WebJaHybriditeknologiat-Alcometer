import { Alert, ScrollView, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import { useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from './styles';



export default function App() {
  const [weight, setWeight] = useState(0)
  const [gender, setGender] = useState('male')
  const [time, setTimes] = useState(0)
  const [openTime, setOpenTime] = useState(false);
  const [valueTime, setValueTime] = useState(null);
  const [openBottles, setOpenBottles] = useState(false);
  const [bottles, setBottles] = useState(0)
  const [valueBottles, setValueBottles] = useState(null);
  const [bloodAlcoholLevel, setBloodAlcoholLevel] = useState(0)


  const genders = [
    {label: 'Male', value: 'male'}, 
    {label: 'Female', value: 'female'}
  ]

  const bottleOptions = Array.from({ length: 10 }, (value, index) => ({
    label: `${index + 1} bottles`,
    value: index,
  }));

  const timeOptions = Array.from({ length: 12 }, (value, index) => ({
    label: `${index + 1} hours`,
    value: index,
  }));

  let bloodAlcoholLevelColor = '#194d48'
    if (bloodAlcoholLevel > 0.5) {
      bloodAlcoholLevelColor = '#b71c1c' }
    else if (bloodAlcoholLevel > 0 && bloodAlcoholLevel < 0.5) {
      bloodAlcoholLevelColor = '#fccb00'
    }
    else {bloodAlcoholLevelColor = 'grey'}
    
  const caclculate = () => { 

    //Check that user has set the weight before the calculation
    if (weight === 0 || weight === '') {
      Alert.alert('Error', 'Please enter a valid weight');
      return;
    }

    // Calculate the number of litres of alcohol consumed
    let litres = bottles * 0.33
  
    // Calculate the number of grams of alcohol consumed
    let grams = litres * 8 * 4.5
  
    // Calculate the amount of alcohol burned per hour
    let burning = weight / 10
  
    // Calculate the number of grams of alcohol left in the body
    let gramsLeft = grams - (burning * time)
  
    // Calculate the blood alcohol level
    let result = 0
    if (gender === 'male') {
      result = gramsLeft / (weight * 0.7)
    } else {
      result = gramsLeft / (weight * 0.6);
    
  
    // Set the blood alcohol level to the maximium of 0 and the calculated result
    setBloodAlcoholLevel(Math.max(0, result));

  }};
  
  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.label}>Alcometer</Text>
      <Text style={styles.textStyles} keyboardType='number-pad'>Weight</Text>
      <TextInput style={styles.textInput} placeholder='Enter weigth (kg)' value={weight} onChangeText={text => setWeight(text)} />
      <Text style={styles.textStyles}>Bottles</Text>
      <DropDownPicker
      open={openBottles}
      value={valueBottles}
      items={bottleOptions}
      setOpen={setOpenBottles}
      setValue={setValueBottles}
      setItems={setBottles}
      onChangeValue={(itemValue) => setBottles (itemValue)}
    />
      <Text style={styles.textStyles}>Time</Text>
      <DropDownPicker
      open={openTime}
      value={valueTime}
      items={timeOptions}
      setOpen={setOpenTime}
      setValue={setValueTime}
      setItems={setTimes}
      onChangeValue={(itemValue) => setTimes (itemValue)}
    />
      <Text style={styles.textStyles}>Gender</Text>
      <RadioForm
        buttonSize={20}
        radio_props={genders}
        initial={0}
        style={styles.radioForm}
        onPress={(value) => setGender(value)}
      />
      <Button style={styles.buttonStyle} title='CALCULATE' onPress={caclculate} />
      <Text style={styles.textResult}>Blood Alcohol Content:</Text>
      <Text style={{ color: bloodAlcoholLevelColor, fontSize: 30, marginLeft: 140}} >{bloodAlcoholLevel.toFixed(2)}</Text>
    </View>
    </ScrollView>
  );
};