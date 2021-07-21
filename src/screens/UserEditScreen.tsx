import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, ScrollView, Button, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addUserApiCall } from '../services/userAddApiService';
import { userListSelectors } from '../store/Users';

import CheckBox from '@react-native-community/checkbox';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import CalendarPicker from 'react-native-calendar-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker'

import Input from '../components/common/TextInput';
import colors from '../assets/theme/colors';



const languages: any = [
    {
        id: '001',
        language: 'English',
        code: 'en',
        isSelected: false
    },
    {
        id: '002',
        language: 'Telugu',
        code: 'tel',
        isSelected: false
    },
    {
        id: '003',
        language: 'Hindi',
        code: 'en',
        isSelected: false
    }
]

var radio_props = [
    { label: 'Male', value: 1 },
    { label: 'Female', value: 2 }
];



const UserEditScreen = ({ route }: any) => {

    const { userData } = route.params;

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const useListState: any = useSelector(userListSelectors.getUsersListState)

    const [form, setForm] = useState(userData);
    const [errors, setErrors] = useState({} as any);

    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [selectedStartDate, setSelectedStartDate] = useState(null)

    const [open, setOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);


    const [stateValue, setStateValue] = useState(null);
    const [cityValue, setCityValue] = useState(null);

    const [states, setStates] = useState([
        { label: 'Andhra Pradesh', value: 'AP', id: 'S01' },
        { label: 'Telangana', value: 'TG', id: 'S02' },
    ]);

    const [cities, setCities] = useState([
        { label: 'Hyderabad', value: 'HYD', id: 'C01' },
        { label: 'Khammam', value: 'KMM', id: 'C02' }, 
    ]);




    const [selectedLanguages, setSelectedLanguages] = useState(languages);
    const [selectedGender, setGelectedGender] = useState(1);

    const [payloadLaguages, setPayloadLaguages] = useState([]);

    // const [date, setDate] = useState('2016-05-15');


    const onChangeCheckBox = (language: any, value: any, index: any) => {

        setErrors((prev: any) => {
            return { ...prev, languages: null }
        })

        console.log('WWWWWW ', selectedLanguages[index])
        selectedLanguages[index].isSelected = value;
        setSelectedLanguages(selectedLanguages)
        setToggleCheckBox(!toggleCheckBox)
    }


    const onDateChange = (date: any) => {
        setSelectedStartDate(date);
        setErrors((prev: any) => {
            return { ...prev, dob: null }
        })
        console.log(date)
    }

    const onChangeDropdown = (type: any, value: any) => {
        console.log(value);
        if (type === 'state') {
            setErrors((prev: any) => {
                return { ...prev, state: null }
            })
        }

        if (type === 'city') {
            setErrors((prev: any) => {
                return { ...prev, city: null }
            })
        }

    }


    const onChange = ({ name, value }: any) => {
        setForm({ ...form, [name]: value });

        if (value !== '') {
            setErrors((prev: any) => {
                return { ...prev, [name]: null }
            })
        } else {
            setErrors((prev: any) => {
                return { ...prev, [name]: 'This filed is required' }
            })
        }
    }


    const onSubmit = () => {



        let isCountriesSelected: any = false;
        let payloadLangs: any = []

        selectedLanguages.forEach((lang: any) => {
            if (lang.isSelected) {
                payloadLangs.push(lang)
                isCountriesSelected = true;
                return true;
            }
        });

        if (!isCountriesSelected) {
            setErrors((prev: any) => {
                return { ...prev, languages: "Required" }
            })
        }

        if (
            form.name &&
            form.userName &&
            form.email &&
            selectedStartDate &&
            selectedGender && payloadLangs.length >= 1) {

            form.dob = selectedStartDate;
            form.gender = selectedGender;
            form.languages = payloadLangs;

            console.log("======== FORM DATA ============ >>>> ", JSON.stringify(form, null, 2))
        // dispatch(addUserApiCall(form, navigation))

        } else {

            if (!form.name) {
                setErrors((prev: any) => {
                    return { ...prev, name: "Required" }
                })
            }
    
            if (!form.userName) {
                setErrors((prev: any) => {
                    return { ...prev, userName: "Required" }
                })
            }
    
            if (!form.email) {
                setErrors((prev: any) => {
                    return { ...prev, email: "Required" }
                })
            }
    
            if (!form.phone) {
                setErrors((prev: any) => {
                    return { ...prev, phone: "Required" }
                })
            }
    
            if (!stateValue) {
                setErrors((prev: any) => {
                    return { ...prev, state: "Required" }
                })
            }
    
            if (!cityValue) {
                setErrors((prev: any) => {
                    return { ...prev, city: "Required" }
                })
            }
    
            if (!selectedStartDate) {
                setErrors((prev: any) => {
                    return { ...prev, dob: "Required" }
                })
            }

        }

        
    }




    return (
        <ScrollView style={styles.container}>
            <Text style={styles.pageTitle}>ADD USER</Text>

            <View>
                <View style={styles.inputContainer}>

                    <Input
                        label="Name"
                        placeholder="Enter Name"
                        onChangeText={(value: any) => {
                            onChange({
                                name: "name",
                                value
                            })
                        }}
                        error={errors.name}
                        value={form.name}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        label="UserName"
                        placeholder="Enter User Name"
                        onChangeText={(value: any) => {
                            onChange({
                                name: "userName",
                                value
                            })
                        }}
                        error={errors.userName}
                        value={form.userName}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        label="Email"
                        placeholder="Enter Email"
                        onChangeText={(value: any) => {
                            onChange({
                                name: "email",
                                value
                            })
                        }}
                        error={errors.email}
                        value={form.email}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Input
                        keyboardType={'phone-pad'}
                        label="Phone"
                        placeholder="Enter Phone"
                        onChangeText={(value: any) => {
                            onChange({
                                name: "phone",
                                value
                            })
                        }}
                        error={errors.phone}
                        value={form.phone}
                    />
                </View>

                <View>
                    <Text>Languages</Text>
                    {selectedLanguages.map((language: any, index: number) => (
                        <View style={styles.language} key={index}>
                            <CheckBox
                                value={language.isSelected}
                                onValueChange={(newValue) => onChangeCheckBox(language, newValue, index)}
                            />
                            <Text>{language.language}</Text>
                        </View>
                    ))}
                    {errors.languages && <Text style={styles.error}>Please select atleast one language</Text>}
                </View>


                <View style={styles.radioGroup}>
                    <Text>Gender</Text>
                    <RadioForm
                        labelHorizontal={false}
                        formHorizontal={true}
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value: any) => setGelectedGender(value)}
                    />
                </View>


                <View style={styles.stateContainer}>
                    <Text>State</Text>
                    <DropDownPicker
                        open={open}
                        value={stateValue}
                        items={states}
                        setOpen={setOpen}
                        setValue={setStateValue}
                        setItems={setStates}
                        listMode="MODAL"
                        onChangeValue={(value) => onChangeDropdown('state', value)}
                    />

                    {errors.state && <Text style={styles.error}>Please select state</Text>}
                </View>

                <View style={styles.stateContainer}>
                    <Text>City</Text>
                    <DropDownPicker
                        open={cityOpen}
                        value={cityValue}
                        items={cities}
                        setOpen={setCityOpen}
                        setValue={setCityValue}
                        setItems={setCities}
                        listMode="MODAL"
                        onChangeValue={(value) => onChangeDropdown('city', value)}
                        disabled={!stateValue}
                    />
                    {errors.city && <Text style={styles.error}>Please select city</Text>}
                </View>


                <View style={styles.calenderContianer}>
                    <Text>Date of Birth</Text>
                    <DatePicker
                        style={{ width: '100%' }}
                        date={selectedStartDate}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        maxDate={new Date()}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(e: any) => onDateChange(e)}
                    />
                    {errors.dob && <Text style={styles.error}>Please select DOB</Text>}
                </View>


                <View style={styles.btnContiner}>

                    <Button title="SUbmit" onPress={() => onSubmit()} />
                </View>




            </View>
        </ScrollView>
    )
}

export default UserEditScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        marginBottom: 50
    },
    pageTitle: {
        alignSelf: 'center',
        fontSize: 20
    },
    inputContainer: {
        paddingVertical: 0
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        width: '100%',
    },
    language: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioGroup: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    calenderContianer: {
        paddingVertical: 20,
        flex: 1,
    },
    btnContiner: {
        marginBottom: 30
    },
    stateContainer: {
        paddingVertical: 20
    },
    cityContainer: {
        paddingVertical: 20
    },
    error: {
        color: colors.danger,
        padding: 4,
        fontSize: 12
    }
})
