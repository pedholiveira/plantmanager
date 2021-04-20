import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    Platform
} from 'react-native';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation() {
    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.content }>
                <Text style={ styles.emoji }>
                    😄
                </Text>

                <Text style={ styles.title }>
                    Prontinho
                </Text>

                <Text style={ styles.subtitle }>
                    Agora vamos começar a cuidar das suas {'\n'}
                    plantinhas com muito cuidado.
                </Text>
                
                <View style={ styles.footer }>
                    <Button 
                        title="Começar"
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: Platform.OS === 'android' ? 25 : 0
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title: {
        fontSize: 22,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        paddingVertical: 10,
        color: colors.heading
    },
    emoji: {
        fontSize: 78
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }
});