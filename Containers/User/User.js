import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

const User = ({route, navigation}) => {
	const sexes = ['Male', 'Female'];
	const activityLevels = ['Sedentary', 'Light Activity', 'Moderate Activity', 'Active', 'Very Active'];
	var {username, age, height, gender, weight, activityLevel} = route.params;
	console.log(gender);
	const [sexSelected, setSexSelected] = useState(0);
	const formChanged = (label, text) => {
		switch (label) {
			case 'age':
				age = text;
				break;
			case 'height':
				height = text;
				break;
			case 'weight':
				weight = text;
				break;
			default:
				console.log('unknown value added to form');
		}
	}
	const updateSexIndex = (u) => {
		setSexSelected(u);
	}

	const activityChanged = (selectedItem, index) => {
		activityLevel = index;
	}
	    const updateUser = () => {
		console.log('sending http request to update current user');
		const user = {'username': username, 'age': age, 'height': height,
				'gender' : sexSelected, 'weight': weight, 'activityLevel': activityLevel}
		axios.post(`http://127.0.0.1:8000/User/UpdateUser/`, user)
		.then(res => {
			if (res.status === 201) {
				navigation.replace('Main', {username, age, height, sexSelected, weight, activityLevel});
			}
		});
	}
    return <View>
        <Text style={styles.headerText}>Edit User Information</Text>
        <View style={styles.inputForm}>
					<Input
						placeholder='Username'
                        backgroundColor="#b3b3b3"
                        borderRadius= "2"
                        disabled={true}
                        value = {username}
					/>
					<Input
						placeholder='Age'
                        defaultValue = {age}
						onChangeText={value => formChanged('age', value)}
					/>
					<Input
						placeholder='Height'
                        defaultValue = {height.toString()}
						onChangeText={value => formChanged('height', value)}
					/>
					<Input
						placeholder='Weight'
                        defaultValue = {weight.toString()}
						onChangeText={value => formChanged('weight', value)}
					/>
					<Text style={styles.formLabel}>Sex</Text>
					<ButtonGroup
						onPress={updateSexIndex}
						selectedIndex={sexSelected}
						buttons={sexes}
						selectedButtonStyle={styles.yellowBackground}
					/>

					<Text style={styles.formLabel}>Activity Level</Text>
					<SelectDropdown
							data={activityLevels}
							onSelect={(selectedItem, index) => {
								activityChanged(selectedItem, index);
							}}
							defaultButtonText={activityLevels[activityLevel]}
							buttonTextAfterSelection={(selectedItem, index) => {
								return selectedItem;
							}}
							rowTextForSelection={(item, index) => {
								return item;
							}}
							buttonStyle={styles.dropdown2BtnStyle}
							buttonTextStyle={styles.dropdown2BtnTxtStyle}
							renderDropdownIcon={() => {
								return (
									<FontAwesome name="chevron-down" color={"#FFF"} size={18} />
								);
							}}
							dropdownIconPosition={"right"}
							dropdownStyle={styles.dropdown2DropdownStyle}
							rowStyle={styles.dropdown2RowStyle}
							rowTextStyle={styles.dropdown2RowTxtStyle}
							style={styles.dropdown}
						/>
					<View style={styles.buttonStyle}>
						<Button
							title={"Update"}
							titleStyle={styles.whiteText}
                            width = ""
							buttonStyle={[styles.buttonStyle, styles.yellowBackground]}
							onPress={() => updateUser()}
						/>
					</View>
            </View>
    </View>
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 12,
        paddingHorizontal: 25,
    },
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'black'
    },
    yellowBackground: {
        backgroundColor: '#FFC72C'
    },
    whiteText: {
        color: 'white'
    },
    inputForm: {
        padding: 12,
        paddingTop: 20,
        alignItems: 'center',
    },
    formLabel: {
        paddingLeft: 12,
        fontSize: 18,
        paddingTop: 24,
        paddingBottom: 10,
        alignItems: 'flex-start',
        width: '100%'
    },
    dropdown2BtnStyle: {
        width: "94%",
        height: 50,
        backgroundColor: "#FFC72C",
        borderRadius: 8,
  },
    dropdown2BtnTxtStyle: {
        color: "#FFF",
        textAlign: "center",
        fontWeight: "bold",
  },
    bottom: {
        paddingTop: 100,
        justifyContent: 'flex-end',
    },
    loginForm: {
        padding: 12,
        justifyContent: 'center',
        height: '80%'
    },
    headerText: {
        fontSize: 18,
        paddingTop: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default User;