import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class Login extends Component {
render() {
    return (
        <View>
            <Text>This is the login page</Text>
            <Button
                title="Go to Main Page"
                onPress={() =>
                    this.props.navigation.navigate('Main')
                }
            />
        </View>
    );
}
}

export default Login;