import React from 'react'
import { StyleSheet} from 'react-native';
import DateTimePicker  from '@react-native-community/datetimepicker'


const dateTimePicker = (props) =>{
    return(
        <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={0}
        value={props.value}
        is24Hour={true}
        mode={props.mode}
        display="default"
        onChange={props.onChange}
        style={styles.iOsPicker}
        />
    )
}

const styles = StyleSheet.create({
    iOsPicker: {
        flex: 1,
        width:'100%'
      },
})
export default dateTimePicker;