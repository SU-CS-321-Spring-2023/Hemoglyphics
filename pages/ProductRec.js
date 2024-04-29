import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Animated, Easing, Dimensions } from 'react-native';

export default function ProductRec({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const mainCircleY = useState(new Animated.Value(-300))[0];  // Starts off-screen above
    const floatCircle1Y = useState(new Animated.Value(-80))[0];
    const floatCircle2Y = useState(new Animated.Value(-150))[0];

    const windowHeight = Dimensions.get('window').height;

    useEffect(() => {
        Animated.sequence([
            Animated.timing(mainCircleY, {
                toValue: windowHeight / 2 - 150, // Centers the circle vertically in the screen
                duration: 2000,
                easing: Easing.bounce,
                useNativeDriver: true
            }),
            Animated.timing(mainCircleY, {
                toValue: windowHeight / 2 - 150,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start();

        const animateFloatingCircles = (animatedValue) => {
            return Animated.loop(
                Animated.sequence([
                    Animated.timing(animatedValue, {
                        toValue: windowHeight,  // Moves down off-screen
                        duration: 10000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    }),
                    Animated.timing(animatedValue, {
                        toValue: windowHeight / 10 - 85,  // Move back to center
                        duration: 8000,
                        easing: Easing.linear,
                        useNativeDriver: true,
                    })
                ])
            );
        };

        animateFloatingCircles(floatCircle1Y).start();
        animateFloatingCircles(floatCircle2Y).start();
    }, []);

    const products = [
        { id: 1, name: "Aisle Super Pad", description: "Ideal for heavy flows, this ultra-absorbable reusable pad can hold the equivalent of 14 tampons and features snappable wings to keep it in place.", price: "$22.00", image: "https://source.unsplash.com/pad/100x100?pad" },
        { id: 2, name: "Flo Organic Eco-Applicator Tampons", description: "Made from organic cotton and features a plant-based applicator. Priced at approximately £3.60 for a pack of 14.", price: "$3.60", image: "https://source.unsplash.com/tampon/100x100?tampon" },
        { id: 3, name: "Saalt Menstrual Cup", description: "A sustainable alternative to tampons, the Saalt cup can last up to a decade and costs around £25. Suitable for all levels of flow.", price: "$25", image: "https://source.unsplash.com/menstruationCup/100x100?cup" }
    ];

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.backgroundCircle, { transform: [{ translateY: mainCircleY }] }]} />
            <Animated.View style={[styles.floatingCircle, { transform: [{ translateY: floatCircle1Y }] }]} />
            <Animated.View style={[styles.floatingCircle, { backgroundColor: '#BC8DA0', transform: [{ translateY: floatCircle2Y }] }]} />
            <ScrollView style={styles.scrollView}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
                {products.map(product => (
                    <TouchableOpacity key={product.id} style={styles.productCard} onPress={() => alert('Product clicked')}>
                        <Image source={{ uri: product.image }} style={styles.productImage} />
                        <View style={styles.productInfo}>
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                            <Text style={styles.productPrice}>{product.price}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(249, 217, 250, 1)',
        position: 'relative',
    },
    scrollView: {
        paddingTop: 20,
    },
    searchInput: {
        height: 50,
        marginHorizontal: 12,
        marginBottom: 30,
        marginTop: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',
    },
    productCard: {
        flexDirection: 'row',
        padding: 10,
        marginHorizontal: 12,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 150,
        shadowColor: '#6b4596',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    productInfo: {
        flex: 1,
        justifyContent: 'space-between',
        paddingLeft: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6b4596',
    },
    productDescription: {
        fontSize: 14,
        color: 'gray',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#BC8DA0',
    },
    backgroundCircle: {
        width: 500,
        height: 500,
        borderRadius: 250,
        backgroundColor: 'pink',
        position: 'absolute',
        left: '50%',
        marginLeft: -250,
        marginTop: 400,
        zIndex: -1,
    },
    floatingCircle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#6b4596',
        position: 'absolute',
        left: '50%',
        marginLeft: -75,
        zIndex: -1,
        opacity: 0.6,
    },
});

