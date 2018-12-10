import {
	Alert,
} from 'react-native';
import { Constants } from 'expo';

export default ApiPost = async (data) => {
	try {
      const { manifest } = Constants;
      let response = await fetch(manifest.extra.apiUrl, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'Json=' + encodeURIComponent(JSON.stringify(data))
      });
      
      if (!response.ok) {
        throw response;
      }
      console.log(response);
      let responseJson = await response.json();
      if(!responseJson.Result){
        Alert.alert(
          '提示',
          responseJson.MessageString,
          [
            {text: '确定', onPress: () => console.log(responseJson)},
          ],
          { cancelable: false }
        )
      }
      return responseJson;
    } catch (error) {
      console.error(error);
    }
}