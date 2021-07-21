import React, { useState } from 'react'
import { View, Text, TextInput } from 'react-native'
import colors from '../../../assets/theme/colors'
import styles from './styles'

const Input = ({ error, icon, iconPosition, label, style, onChangeText, value, ...props } : any) => {

    const [foused, setFoused] = useState(false)

    const getFlexDirection = () => {
        if (icon && iconPosition) {
            if (iconPosition === 'right')
                return 'row-reverse'
            else
                return 'row'
        }
    }



    const getBorderColor = () => {

        if (error) {
            return colors.danger
        }

        if (foused) {
            return colors.primary
        }
        else {
            return colors.grey
        }
    }
    return (
        <View style={styles.inputContainer}>
            {label && <Text>{label}</Text>}

            <View style={[styles.wrapper, { alignItems: icon ? 'center' : 'baseline', borderColor: getBorderColor(), flexDirection: getFlexDirection() }]}>
                <View>
                    {icon && icon}
                </View>
                <TextInput
                    label={label}
                    style={[styles.textInput, style]}
                    onChangeText={onChangeText}
                    value={value}
                    onFocus={() => { setFoused(true) }}
                    onBlur={() => { setFoused(false) }}
                    {...props}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    )
}

export default Input
