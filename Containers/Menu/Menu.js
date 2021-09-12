import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, DeviceEventEmitter } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

const Menu = ({route, navigation}) => {
	const {date, categories, username} = route.params;
	const [items, setItems] = useState([]);

	const categoryClicked = (i) => {
		axios.get(`http://127.0.0.1:8000/nutrition/category/${categories[i]}/`)
			.then(res => {
				setItems(res.data);
			});
	}

	const itemClicked = (i) => {
		console.log(date);
		axios.post(`http://127.0.0.1:8000/log/${username}/${date}/`, {item:items[i].name, amount:1})
		.then(res => {
			if (res.status === 201) {
				DeviceEventEmitter.emit("event.itemClicked");
				navigation.goBack();
			}
		});
	}

	return (
		<View>
			<ScrollView>
				{
					items.length == 0
					? categories.map((l, i) => (
						<TouchableOpacity key={i} onPress={() => {categoryClicked(i)}}>
							<ListItem key={i} bottomDivider>
								<ListItem.Content>
									<ListItem.Title>{l}</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						</TouchableOpacity>
					))
					: items.map((l, i) => (
						<TouchableOpacity key={i} onPress={() => {itemClicked(i)}}>
							<ListItem key={i} bottomDivider>
								<ListItem.Content>
									<ListItem.Title>{l.name}</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						</TouchableOpacity>
					))
				}
			</ScrollView>
		</View>
	);
}

export default Menu;