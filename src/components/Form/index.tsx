import { ArrowLeft } from 'phosphor-react-native';
import React, {useState} from 'react';
import {
   View,
   TextInput,
   Image,
   Text,
   TouchableOpacity
 } from 'react-native';
import { theme } from '../../theme';
import { feedbackTypes } from '../../utils/feedbackTypes';
import { FeedbackType } from '../../components/Widget';
import { Button } from '../../components/Button'
import { ScreenshotButton } from '../../components/ScreenshotButton'
 import {captureScreen }  from 'react-native-view-shot';

import { styles } from './styles';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCanceled:() => void;
  onFeedbackSent:() => void; 
}


export function Form({feedbackType,onFeedbackCanceled, onFeedbackSent }: Props) {

const [screenshot, setScreeshot] = useState<string | null>()


const feedbackTypeInfo = feedbackTypes[feedbackType];


function handleScreenshot() {
  captureScreen({
    format: 'jpg',
    quality: 0.8
  })
   
 .then(uri => setScreeshot(uri))
.catch(error => console.log (error));


  
}

function handleScreenshotRemove() {
  setScreeshot(null);
}

  return (
    <View style={styles.container}>
      <View style={styles.header}>  

<TouchableOpacity onPress={onFeedbackCanceled}>
  <ArrowLeft
  size= {24}
  weight="bold"
  color={theme.colors.text_secondary}
  />
</TouchableOpacity>

<View style={styles.titleContainer}>

  <Image
    source={feedbackTypeInfo.image}
    style={styles.image}
  />
  
  
<Text style={styles.titleText}>
  {feedbackTypeInfo.title}

</Text>

</View>
      </View>

<TextInput

multiline 
style = {styles.input}
placeholder="Olá tudo bem? está com duvida em alguma coisa? "
placeholderTextColor={theme.colors.text_secondary}

/>
<View style={styles.footer} >
<ScreenshotButton
onTakeShot={handleScreenshot}
onRemoveShot= {handleScreenshotRemove}
screenshot={screenshot}

/>
<Button 
isLoading={false}

/>
</View>      
    </View>

  );
}