import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Button, Input, ButtonGroup } from 'react-native-elements';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import axios from 'axios';

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
	bottom: {
		paddingTop: 100,
    	justifyContent: 'flex-end',
	},
	loginForm: {
		padding: 12,
		justifyContent: 'center',
		height: '80%'
	},
});
const Login = ({navigation, props}) => {

  const [loggedIn, setLoggedIn] = useState(false);
	const [buttonSelected, setButtonSelected] = useState(1);
	const [sexSelected, setSexSelected] = useState(0);
	const [username, setUsername] = useState("");
	const [age, setAge] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");
	const [activity, setActivity] = useState(0);

	const sexes = ['Male', 'Female'];
	const activityLevels = ['Sedentary', 'Light Activity', 'Moderate Activity', 'Active', 'Very Active'];

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
				setUsername(text);
				break;
			case 'age':
				setAge(text);
				break;
			case 'height':
				setHeight(text);
				break;
			case 'weight':
				setWeight(text);
				break;
			default:
				console.log('unknown value added to form');
		}
	}

	const updateSexIndex = (i) => {
		setSexSelected(i);
	}

	const activityChanged = (selectedItem, index) => {
		setActivity(index+1);
	}

	const signUp = () => {
		console.log('sending http request to make a new account');
		const user = {
			username, 
			age, 
			height,
			weight, 
			gender: sexSelected,
			activityLevel: activity
		};
		
		console.log(user);
		axios.post(`https://supersizemeproduction.herokuapp.com/User/UpdateUser/`, user)
			.then(res => {
				if (res.status === 201) {
					navigation.replace('Main', {username, age, height, gender, weight, activity});
				}
			});
	}

	const login = () => {
		console.log('send http request for login');

		axios.get(`https://supersizemeproduction.herokuapp.com/User/${username}/login/`).then(resp => {
			if (resp.status === 200) {
				navigation.replace('Main', {username: resp.data.user, age: resp.data.age, height: resp.data.height, gender: resp.data.gender, weight: resp.data.weight, activityLevel:resp.data.activityLevel});
			}
		});
	}

	return (
		<View>
			<ScrollView>
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
				{ buttonSelected == 2 
				? <View style={styles.inputForm}>
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
							onPress={(i) => {updateSexIndex(i)}}
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
						<View style={styles.buttonStyle}>
							<Button
								title={"Sign Up"}
								titleStyle={styles.whiteText}
								buttonStyle={[styles.buttonStyle, styles.yellowBackground]}
								onPress={() => signUp()}
							/>
						</View>
					</View>
					: <View style={styles.loginForm}>
							<Input
								placeholder='Username'
								onChangeText={value => formChanged('username', value)}
							/>
							<View style={styles.buttonStyle}>
								<Button
									title={"Login"}
									titleStyle={styles.whiteText}
									buttonStyle={[styles.buttonStyle, styles.yellowBackground]}
									onPress={() => login()}
								/>
						</View>
						</View>	
				}
			</ScrollView>
		</View>
	);
}

export default Login;