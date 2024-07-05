import { Link, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const polls = [{ id: 1 }, { id: 2 }, { id: 3 }];

export default function HomeScreen() {
    return (
        <>
            <Stack.Screen options={{
                title: 'Polls',
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: '#00134F',
                },
                headerTintColor: 'white',
            }} />
            <FlatList
                data={polls}
                scrollEnabled
                contentContainerStyle={styles.container}
                renderItem={({item}) => (
                    <Link href={`/polls/${item.id}`} style={styles.pollsContainer} >
                        <Text style={styles.poll}>Example Poll Question</Text>
                    </Link>
                )}
            />

        </>

    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 5,
    },
    pollsContainer: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    poll: {
        fontWeight: 'bold',
        fontSize: 20,
    },

});
