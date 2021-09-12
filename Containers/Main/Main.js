import React, { useState, useEffect } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SpeedDial, Overlay } from 'react-native-elements';
import CircularProgress from 'react-native-circular-progress-indicator';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

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

let temp_rec = {
	'calories': 0,
	'protein': 0,
	'carbs': 0,
	'fats': 0
}

const Main = ({navigation, route}) => {
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const [showDateTime, setShowDateTime] = useState(true);
	const [days, setDays] = useState([]);
	const [date, setDate] = useState(new Date());

	const [categories, setCategories] = useState([]);

	const {username, age, height, gender, weight, activityLevel} = route.params;
	console.log(route.params)
  
	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShowDateTime(false);
		setDate(currentDate);
		setOpen(false);
		setVisible(false);

		const currentDays = [...days];
		currentDays.push(
			{
				date: currentDate,
				info: {
					'calories': 0,
					'protein': 0,
					'carbs': 0,
					'fats': 0
				}
			});
		setDays(currentDays);
	};

	const toggleOverlay = () => {
		setVisible(!visible);
		setShowDateTime(true);
	};

	const onNutrientCardClicked = (i) => {
		const dateString = days[i].date.getFullYear() + '-' + ('0' + (days[i].date.getMonth()+1)).slice(-2) + '-' + ('0' + (days[i].date.getDate()+1)).slice(-2)
		navigation.navigate('Menu', {date: dateString, categories, username});
	}

	const onUserPageClicked = () => {
		navigation.replace('User', {username, age, height, gender, weight, activityLevel});
	}

	DeviceEventEmitter.addListener("event.itemClicked", (d) => {
		axios.get(`https://supersizemeproduction.herokuapp.com/log/${username}/`)
		.then(res => {
			let arraydata = [];
			res.data.forEach(function(obj){
				arraydata.push({
					date: new Date(obj.date),
					info: {
						'calories': obj.calories,
						'protein': obj.protein,
						'carbs': obj.carbohydrates,
						'fats': obj.total_fat
					}
				});
			});
			setDays(arraydata);
		});
	});

	useEffect(() => {
		// call api for nutrition info
		axios.get(`https://supersizemeproduction.herokuapp.com/nutrition/`)
		.then(res => {
			setCategories(res.data);
		});
		axios.get(`https://supersizemeproduction.herokuapp.com/log/${username}/`)
		.then(res => {
			let arraydata = []
			res.data.forEach(function(obj){
				arraydata.push({
					date: new Date(obj.date),
					info: {
						'calories': obj.calories,
						'protein': obj.protein,
						'carbs': obj.carbohydrates,
						'fats': obj.total_fat
					}
				});
			});
			setDays(arraydata);
		});
		axios.get(`https://supersizemeproduction.herokuapp.com/calrecs/${username}/calrecs/`).then(res => {
			temp_rec = res.data
		});
	}, []);

    return (
		<View style={{height: '100%'}}>
			<Text style={styles.headerText}>Welcome Back {username}</Text>
			<ScrollView>
				{
					days.map((day, i) => {
						return (
							<NutrientCard 
								key={i}
								current={day.info}
								recommend={temp_rec}
								date={day.date}
								onClick={() => onNutrientCardClicked(i)}
							/>
						)})
				}
			</ScrollView>
			<Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
				<View style={{width: 150, alignContent: 'center', justifyContent: 'center'}}>
					{showDateTime && <DateTimePicker
						testID="dateTimePicker"
						value={date}
						mode='date'
						display="default"
						onChange={onChange}
					/>}
				</View>
			</Overlay>
			<SpeedDial
				isOpen={open}
				icon={{ name: 'edit', color: '#fff' }}
				openIcon={{ name: 'close', color: '#fff' }}
				onOpen={() => setOpen(!open)}
				onClose={() => setOpen(!open)}
			>
				<SpeedDial.Action
					icon={{ name: 'add', color: '#fff' }}
					title="Add Date"
					onPress={toggleOverlay}
				/>
			</SpeedDial>
			<TouchableOpacity 
			onPress={onUserPageClicked}
			style={{ borderWidth:1,
				borderColor:'rgba(0,0,0,0.2)',
				alignItems:'center',
				marginBottom:44,
				marginLeft: 18,
				justifyContent:'center',
				width:55,
				height:55,
				backgroundColor:'dodgerblue',
				borderRadius:100,
			}}
			>
			<Icon name={"cog"}
    		size={30}
    		color="#fff" />
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
	},
	headerText: {
		fontSize: 18,
		paddingTop: 16,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default Main;