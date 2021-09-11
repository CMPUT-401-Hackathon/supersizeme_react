import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
		paddingTop: 50,
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
});
const Login = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
	const [buttonSelected, setButtonSelected] = useState(1);
	const [sexSelected, setSexSelected] = useState(0);

	const sexes = ['Male', 'Female'];
	const activityLevels = ['Sedentary', 'Light Activity', 'Moderate Activity', 'Active', 'Very Active'];

	let username = "";
	let age = "";
	let height = "";
	let weight = "";
	let activity;

	const buttonClicked = (title) => {
		switch (title) {
			case 'login':
				setButtonSelected(1);
				break;
			case 'signup':
				setButtonSelected(2);
				break;
			default:
				console.log('unknown button clicked in login page');
		}
	}

	const formChanged = (label, text) => {
		switch (label) {
			case 'username':
				username=text;
				break;
			case 'age':
				age=text;
				break;
			case 'height':
				height=text;
				break;
			case 'weight':
				weight=text;
				break;
			default:
				console.log('unknown value added to form');
		}
		console.log(username, age, height, weight);
	}

	const updateSexIndex = (i) => {
		setSexSelected(i);
	}

	const activityChanged = (selectedItem, index) => {
		activity = index+1;
	}

	return (
		<View>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonStyle}>
					<Button
						title="Login"
						type={buttonSelected === 1 ? "solid" : "clear"}
						titleStyle={buttonSelected === 1 ? styles.whiteText : styles.buttonText}
						buttonStyle={buttonSelected === 1 ? [styles.buttonStyle, styles.yellowBackground] : styles.buttonStyle}
						onPress={() => buttonClicked('login')}
					/>
				</View>
				<View style={styles.buttonStyle}>
					<Button
						title="Sign Up"
						type={buttonSelected === 2 ? "solid" : "clear"}
						titleStyle={buttonSelected === 2 ? styles.whiteText : styles.buttonText}
						buttonStyle={buttonSelected === 2 ? [styles.buttonStyle, styles.yellowBackground] : styles.buttonStyle}
						onPress={() => buttonClicked('signup')}
					/>
				</View>
			</View>
			<View style={styles.inputForm}>
				<Input
					placeholder='Username'
					onChangeText={value => formChanged('username', value)}
				/>
				<Input
					placeholder='Age'
					onChangeText={value => formChanged('age', value)}
				/>
				<Input
					placeholder='Height'
					onChangeText={value => formChanged('height', value)}
				/>
				<Input
					placeholder='Weight'
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
            defaultButtonText={"Select Activity Level"}
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
			</View>
			<Button
				title="Go to Main Page"
				onPress={() =>
					console.log(username, age, weight, height, sexSelected, activity)
				}
			/>
		</View>
	);
}

export default Login;