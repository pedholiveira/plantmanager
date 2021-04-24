import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import userImg from '../assets/pedro.jpg';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export function Header({
    title = undefined, subtitle = undefined
}: HeaderProps) {
    const [headerTitle, setHeaderTitle] = useState(title);
    const [headerSubtitle, setHeaderSubtitle] = useState(subtitle);
    
    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setHeaderSubtitle(user || '');
        }

        if(!headerTitle) {
            setHeaderTitle('Olá,');
        }
        if(!headerSubtitle) {
            loadStorageUserName();
        }
    }, []);

    return (
        <View style={ styles.container }>
            <View>
                <Text style={ styles.greeting }>{ headerTitle }</Text>
                <Text style={ styles.userName }>{ headerSubtitle }</Text>
            </View>
            <Image source={userImg} style={ styles.image }/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight()
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35
    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },
    userName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 40
    }
});