import React, {useRef, useState} from 'react';
import {TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { styles } from './styles';
import { theme } from '../../theme';

import { Options } from '../Options';
import { Success } from '../Success';
import { Form } from '../Form';

import  {feedbackTypes} from '../../utils/feedbackTypes';

export type FeedbackType = keyof typeof feedbackTypes;





 function Widget() {
const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
const [feedbacksent, setFeedbackSent] = useState(false);

const BottomSheetRef = useRef<BottomSheet>(null);

function handleOpen() {
  BottomSheetRef.current?.expand();
}


function handleRestarFeedback(){
setFeedbackType(null);
setFeedbackSent(false);
}


function handleFeedbackSent() {

  setFeedbackSent(true);
}

  return (
    <>
<TouchableOpacity 
style={styles.button}
onPress={handleOpen}
>

<ChatTeardropDots
size={24}
weight="bold"
color={theme.colors.text_on_brand_color}

/>
</TouchableOpacity>

<BottomSheet
ref={BottomSheetRef} 
snapPoints={[1, 280]}
backgroundStyle={styles.modal}
handleIndicatorStyle={styles.indicator}
>


{
  feedbacksent ?
  <Success/>
  :

  <> 
  {
    feedbackType ?

    <Form
  
    feedbackType={feedbackType}
    onFeedbackCanceled={handleRestarFeedback}
    onFeedbackSent={handleFeedbackSent}
    />
    :

    <Options onFeedbackTypeChanged={setFeedbackType}/>
  }
  

  </>
}




</BottomSheet>

    </>
  );
}



export default gestureHandlerRootHOC(Widget);
