import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Title, Card, Paragraph } from 'react-native-paper';
import { EmailContext } from '../EmailContext';

const DocumentScreen = () => {
    const [documents, setDocuments] = useState([]);
    const { email } = useContext(EmailContext);
    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await fetch('http://192.168.0.117:3000/document/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email
                }),
            });
            const data = await response.json();
            setDocuments(data.document);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Content>
                <Paragraph>{item}</Paragraph>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={documents}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop: 25
    },
    title: {
        marginBottom: 16,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 8,
    },
});

export default DocumentScreen;