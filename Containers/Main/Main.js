import React, { useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import CircularProgress from 'react-native-circular-progress-indicator';

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
			<Card>
				<Card.Title>{monthNames[d.getMonth()] + " " + d.getDate()}</Card.Title>
				<Card.Divider/>
				<View style={{flexDirection:"row"}}>
					<View styles={styles.circleContainer}>
						<CircularProgress
							showProgressValue={false}
							value={temp_curr['calories'] > temp_rec['calories'] ? temp_rec['calories'] : temp_curr['calories']}
							radius={120}
							duration={2000}
							maxValue={temp_rec['calories']}
							activeStrokeColor={colours['calories']}
						/>
						<View style={styles.circleSecond}>
							<CircularProgress
								showProgressValue={false}
								value={temp_curr['protein'] > temp_rec['protein'] ? temp_rec['protein'] : temp_curr['protein']}
								radius={100}
								duration={2000}
								maxValue={temp_rec['protein']}
								activeStrokeColor={colours['protein']}
							/>
						</View>
						<View style={styles.circleThird}>
							<CircularProgress
								showProgressValue={false}
								value={temp_curr['carbs'] > temp_rec['carbs'] ? temp_rec['carbs'] : temp_curr['carbs']}
								radius={80}
								duration={2000}
								maxValue={temp_rec['carbs']}
								activeStrokeColor={colours['carbs']}
							/>
						</View>
						<View style={styles.circleFourth}>
							<CircularProgress
								showProgressValue={false}
								value={temp_curr['fats'] > temp_rec['fats'] ? temp_rec['fats'] : temp_curr['fats']}
								radius={60}
								duration={2000}
								maxValue={temp_rec['fats']}
								activeStrokeColor={colours['fats']}
							/>
						</View>
					</View>
					<View style={{paddingLeft: 10, alignItems: 'left', justifyContent: 'center'}}>
						{Object.keys(colours).map((c, i) => <Text key={i} style={[styles.labelText, {color: colours[c]}]}>{capitalizeFirstLetter(c)}</Text>)}
					</View>
					<View style={{paddingLeft: 10, alignItems: 'left', justifyContent: 'center'}}>
						{Object.keys(colours).map((c, i) => <Text key={i} style={[styles.labelText, {color: colours[c]}]}>{Math.floor(temp_curr[c] / temp_rec[c] * 100)} %</Text>)}
					</View>
				</View>
			</Card>

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