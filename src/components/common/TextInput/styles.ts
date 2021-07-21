import { StyleSheet } from "react-native"
import colors from "../../../assets/theme/colors"


export default StyleSheet.create({
    inputContainer: {
        paddingVertical: 12
    },
    wrapper: {
        height: 42,
        borderColor: colors.grey,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 5,
        flexDirection: 'row',
        marginTop: 5,
    },
    textInput: {
        // backgroundColor: 'red',
        flex: 1,
        width: '100%'
    },
    error: {
        color: colors.danger,
        padding: 4,
        fontSize: 12
    }
})