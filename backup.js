
const PostEvent = () =>{
    
    //Omitted code for brevity. 

return(
    <Formik
         initialValues ={{user: userName.currentUser.displayName, description: '',datePosted: new Date(), location: '', eventDate: '', title: ''}}
         onSubmit ={(values, {resetForm}) =>{
                 firebase.firestore().collection('PostedFunEvents').add({
                     datePosted: values.datePosted.toDateString(),
                     description: values.description, 
                     eventDate: date.toDateString(),
                     eventTime: date.toTimeString(),
                     location: values.location,
                     title: values.title,
                     user: firebase.auth().currentUser.displayName,
                     userId : firebase.auth().currentUser.uid
                     });
                 resetForm({values:''})
                 }}> 
         {props =>(

         <ScrollView keyboardShouldPersistTaps='always'>
         <DismissKeyBoard>
         <View style={{flex:1}}>
             <View  style={styles.form}><Text  style={styles.text}>Pick a place for the event</Text></View>
             <View style= {{paddingTop:20}}>
                 <GoogleAutocomplete 
                     placeholder = 'Insert place to post about '
                     onPress={(data, details = null) => {
                             {props.values.location = data.description}
                         }}>     
                 </GoogleAutocomplete>
             </View >
               
                <View style={styles.form}>    

                 <Text style={styles.text}>{userName.currentUser.displayName}</Text>
                 <TextInput
                     placeholder= 'Title of the event'
                     onChangeText = {props.handleChange('title')} 
                     style={styles.text}/>
                 <TextInput
                     placeholder= 'Description (e.g This is located...)'
                     multiline={true}
                     onChangeText = {props.handleChange('description')}
                     values = {props.values.description} 
                     style={styles.textBox}/>

                 <Text  style={styles.text} >Click on the below icons to pick a time and a date for the event</Text>

                 <DateTimeImage onPress={showTimepicker} name = 'alarm'>Time?</DateTimeImage> 
                 <DateTimeImage onPress={showDatepicker} name = 'calendar'>Date?</DateTimeImage> 
             
                  {show && (<DateTimePicker onChange={onChange} value = {date} mode = {mode}></DateTimePicker>)}
                     
                 <Button onPress={props.handleSubmit}>Submit</Button>

                 </View>    
               
         </View>       
         </DismissKeyBoard>     
         </ScrollView>
         )}
     </Formik> 
 )
}
