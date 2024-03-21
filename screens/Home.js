import React, { useState } from 'react'
import { View, Image, Platform } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, ActivityIndicator } from 'react-native-paper'
import * as ImageManipulator from 'expo-image-manipulator';

const Home = () => {
    const [image, setImage] = useState(null)
    const [uploading, setUploading] = useState(false)

    const pickImage = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync()
            if (status !== 'granted') {
                alert('Sorry, we need camera permissions to make this work!')
                return
            }
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.cancelled) {
            console.log(result.assets[0].uri)
            const base64Image = await imageToBase64(result.assets[0].uri)
            setImage(base64Image)
        }
    }

    const uploadImage = async () => {
        setUploading(true)
        const formData = new FormData()
        formData.append('image', image)
        console.log(image)
        try {
            const response = await fetch('https://your-server.com/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: image }),
            })
            console.log('Image uploaded successfully:', response.data)
        } catch (error) {
            console.error('Error uploading image:', error)
        } finally {
            setUploading(false)
        }
    }

    const imageToBase64 = async (uri) => {
        let base64Image = null
        try {
            const manipulatedImage = await ImageManipulator.manipulateAsync(
                uri,
                [],
                { format: 'jpeg', base64: true }
            )
            base64Image = `data:image/jpeg;base64,${manipulatedImage.base64}`
        } catch (error) {
            console.error('Error converting image to base64:', error)
        }
        return base64Image
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            <Button mode="contained" onPress={pickImage} style={{ marginVertical: 10 }}>
                Pick Image
            </Button>
            <Button
                mode="contained"
                onPress={uploadImage}
                loading={uploading}
                disabled={!image}
                style={{ marginVertical: 10 }}
            >
                Upload Image
            </Button>
            {uploading && <ActivityIndicator animating={true} />}
        </View>
    )
}

export default Home
