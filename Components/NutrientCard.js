import React, { useState } from 'react';
import { Text, Image, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import CircularProgress from 'react-native-circular-progress-indicator';

const monthNames = ["January", "February", "March", "April", "May", "June",
  	"July", "August", "September", "October", "November", "December"
];

const capitalizeFirstLetter = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const NutrientCard = (props) => {
    const colours = {
        'calories': '#348ceb',
        'protein': '#ebc334',
        'carbs': '#25b845',
        'fats': '#870f35'
    };

    const onClick = () => {
        console.log(monthNames[props.date.getMonth()] + " " + props.date.getDate());
        props.onClick();
    }
    
    return (
		<View>
            <TouchableOpacity onPress={onClick}>
                <Card>
                    <Card.Title>{monthNames[props.date.getMonth()] + " " + (props.date.getDate()+1)}</Card.Title>
                    <Card.Divider/>
                    <View style={{flexDirection:"row"}}>
                        <View styles={styles.circleContainer}>
                            <CircularProgress
                                showProgressValue={false}
                                value={props.current['calories'] > props.recommend['calories'] ? props.recommend['calories'] : props.current['calories']}
                                radius={120}
                                duration={2000}
                                maxValue={props.recommend['calories']}
                                activeStrokeColor={colours['calories']}
                            />
                            <View style={styles.circleSecond}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={props.current['protein'] > props.recommend['protein'] ? props.recommend['protein'] : props.current['protein']}
                                    radius={100}
                                    duration={2000}
                                    maxValue={props.recommend['protein']}
                                    activeStrokeColor={colours['protein']}
                                />
                            </View>
                            <View style={styles.circleThird}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={props.current['carbs'] > props.recommend['carbs'] ? props.recommend['carbs'] : props.current['carbs']}
                                    radius={80}
                                    duration={2000}
                                    maxValue={props.recommend['carbs']}
                                    activeStrokeColor={colours['carbs']}
                                />
                            </View>
                            <View style={styles.circleFourth}>
                                <CircularProgress
                                    showProgressValue={false}
                                    value={props.current['fats'] > props.recommend['fats'] ? props.recommend['fats'] : props.current['fats']}
                                    radius={60}
                                    duration={2000}
                                    maxValue={props.recommend['fats']}
                                    activeStrokeColor={colours['fats']}
                                />
                            </View>
                        </View>
                        <View style={{paddingLeft: 10}}>
                            {Object.keys(colours).map((c, i) => 
                                <Text key={i} style={[styles.labelText, {color: colours[c]}]}>{capitalizeFirstLetter(c)}</Text>
                            )}
                        </View>
                        <View style={{paddingLeft: 10}}>
                            {Object.keys(colours).map((c, i) => <Text key={i} style={[styles.labelText, {color: colours[c]}]}>{Math.floor(props.current[c] / props.recommend[c] * 100)} %</Text>)}
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
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

export default NutrientCard;