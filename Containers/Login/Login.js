import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  buttonStyle: {
		padding: 24,
		paddingHorizontal: 50,
  },
	buttonContainer: {
		flexDirection:'row',
		justifyContent: 'center',
    alignItems: 'center'
	},
	buttonText: {
		color: 'black'
	}
});
const Login = (props) => {

  const [loggedIn, setLoggedIn] = useState(false);
	const [buttonSelected, setButtonSelected] = useState(1);

	return (
		<View>
			<View style={styles.buttonContainer}>
				<View style={styles.buttonStyle}>
					<Button title="Login" type="clear" titleStyle={styles.buttonText}/>
				</View>
				<View style={styles.buttonStyle}>
					<Button title="Sign Up" type="clear" titleStyle={styles.buttonText}/>
				</View>
			</View>
			<Button
				title="Go to Main Page"
				onPress={() =>
					props.navigation.navigate('Main')
				}
			/>
		</View>
	);
}

export default Login;