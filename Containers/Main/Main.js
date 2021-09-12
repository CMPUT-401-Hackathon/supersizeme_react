import React, { useState } from 'react';
import { Text, Image, View, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { SpeedDial, Overlay } from 'react-native-elements';
import CircularProgress from 'react-native-circular-progress-indicator';
import DateTimePicker from '@react-native-community/datetimepicker';

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

const Main = ({navigation, route}) => {
	const [open, setOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const [showDateTime, setShowDateTime] = useState(true);
	const [days, setDays] = useState([
		{
			date: new Date(),
			info: {
				'calories': 2142,
				'protein': 134,
				'carbs': 80,
				'fats': 100
			}
		}
	]);
	const [menuVisible, setMenuVisible] = useState(false);

	const [date, setDate] = useState(new Date());
  
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

	const onCardClicked = (i) => {
		
	};

    return (
		<View style={{height: '100%'}}>
			<ScrollView>
				{
					days.map((day, i) => {
						return (
						<TouchableOpacity onPress={onCardClicked(i)} key={i}> 
							<NutrientCard 
								key={i}
								current={day.info}
								recommend={temp_rec}
								date={day.date}
							/>
						</TouchableOpacity>)
					})
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