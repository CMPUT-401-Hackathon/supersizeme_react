import React, { useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import CircularProgress from 'react-native-circular-progress-indicator';

import NutrientCard from '../../Components/NutrientCard';

const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
];
const d = new Date();

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}  

const colours = {
	'calories': '#348ceb',
	'protein': '#ebc334',
	'carbs': '#25b845',
	'fats': '#870f35'
};

const temp_rec = {
	'calories': 2500,
	'protein': 200,
	'carbs': 300,
	'fats': 60
}

const temp_curr = {
	'calories': 2142,
	'protein': 134,
	'carbs': 80,
	'fats': 100
}

const Main = ({navigation, route}) => {
    return (
		<View>
			<NutrientCard 
				current={temp_curr}
				recommend={temp_rec}
				date={new Date()}
			/>
		</View>
    );
}

const styles = StyleSheet.create({
	circleContainer: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',	
	},
	circleSecond: {
		position: 'absolute',
        marginTop: 20,
		marginLeft: 20
	},
	circleThird: {
		position: 'absolute',
        marginTop: 40,
		marginLeft: 40
	},
	circleFourth: {
		position: 'absolute',
        marginTop: 60,
		marginLeft: 60
	},
	labelText: {
		paddingTop: 10,
		paddingBottom: 10,
		fontWeight: 'bold'
	}
});

export default Main;