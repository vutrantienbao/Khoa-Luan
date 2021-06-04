import React, { useState, useEffect, useMemo, useReducer, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Linking,
  TextInput,
  ScrollView,
  Platform,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AnimatedWave from 'react-native-animated-wave';
import tailwind from 'tailwind-rn';
import DropDownPicker from 'react-native-dropdown-picker';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const App = () => {
  /*~~~~~~~~~~React Native Firebase~~~~~~~~~*/

  /*~~~~~~~~~~Set the time present~~~~~~~~~*/

  const [dose, setDose] = useState('null');
  const [cps, setCPS] = useState('null');
  const [totalCounts, setTotalCounts] = useState('null');

  const fetchData = async () => {
    const response = await fetch(`http://api-ibm.glitch.me/recent`);
    const responseJson = await response.text();
    return responseJson;
  }


  const [handleClick, setHandleClick] = useState(1);
  const [RealTime, setRealTime] = useState('0');

  const [value, onChangeText] = useState('3');

  const [checkOld, setCheckOld] = useState('0');
  const [checkRecent, setCheckRecent] = useState('0');

  const arrayOfArrayValue = [dose, cps, totalCounts];
  const arrayOfArrayUnit = ["µSv/h", "cps", "Total"];
  let today = new Date();
  let date = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();


  const memorizedFunction = useCallback(() => {
    if (handleClick === 3) {
      setHandleClick(1);
    } else {
      setHandleClick(handleClick + 1);

    }
  })


  function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

  const stationz = () => {

    fetchData().then(dataJSON => {
      console.log(JSON.parse(dataJSON)[0].Dose);
      setCheckRecent(JSON.parse(dataJSON)[0].RealTime);

      if (checkOld !== checkRecent) {
        setDose(JSON.parse(dataJSON)[0].Dose.toFixed(3));

        setCPS(JSON.parse(dataJSON)[0].CPS);
        setTotalCounts(JSON.parse(dataJSON)[0].TotalCount);
        setTimeout(function () {
          setCheckOld(checkRecent);
        }, 4000);
      }
      else {
        setDose("null");
        setCPS("null");
        setTotalCounts("null");
      }

    }).catch(e => console.log(e));


  }


  useEffect(() => {
    let mounted = true
    if (mounted) {
      try {
        stationz();
        let timer1 = setTimeout(() => {

          setRealTime(date);
        }, 1000);
        timer1;
        return () => {
          clearTimeout(timer1);
          mounted = false; // add this
        }
      }
      catch (err) {
        console.log(err);
      }
    }

  }, [RealTime])

  let touchProps = {
    style:
      parseFloat(arrayOfArrayValue[handleClick - 1]) >= parseFloat(value) ? styles.circleRed : styles.circle,
  };
  /* let responsiveFont = DEVICE_WIDTH <= 360 ? 1.3 : 1.5; */
  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <View
        style={tailwind(
          ' bg-white h-12 w-full items-center justify-center flex flex-row justify-center px-4',
        )}>

        <Text style={[tailwind('font-bold text-blue-700'), { fontSize: RFPercentage(3) }]}>
          {RealTime}
        </Text>

      </View>

      <View style={[tailwind("flex flex-row"), { flex: 0.7, marginTop: 40, marginBottom: 10, }]}>

        <View {...touchProps}>
          <AnimatedWave
            sizeOvan={200}
            colorOvan={
              parseFloat(arrayOfArrayValue[handleClick - 1]) >= parseFloat(value) ? 'red' : '#6495ED'
            }
            zoom={2}
            value={(arrayOfArrayValue[handleClick - 1] < 10) ? arrayOfArrayValue[handleClick - 1] : nFormatter(arrayOfArrayValue[handleClick - 1])}
            onPress={memorizedFunction}
            unit={arrayOfArrayUnit[handleClick - 1]}
          />
        </View>
      </View>

      <View style={[tailwind("justify-between"), { flex: 0.2, flexDirection: 'row', width: DEVICE_WIDTH }]}>
        <View style={[tailwind("h-12 flex-1 justify-center "), { alignItems: 'center' }]}>
          <TouchableOpacity style={[tailwind("rounded-lg bg-purple-600 flex justify-center items-center"), styles.viewAllData]} onPress={() =>
            Linking.openURL(
              'https://api-ibm.glitch.me/list',
            )
          } ><Text style={[tailwind("text-white font-bold"), { fontSize: RFPercentage(1.5) }]}>VIEW ALL DATA</Text>
          </TouchableOpacity>
        </View>
        <View style={[tailwind("h-12 flex-1 justify-center"), { alignItems: 'center' }]}>
          <TouchableOpacity style={[tailwind("rounded-lg bg-purple-600 flex justify-center items-center"), styles.viewRecentData]} onPress={() =>
            Linking.openURL(
              'https://api-ibm.glitch.me/recent',
            )
          } ><Text style={[tailwind("text-white font-bold"), { fontSize: RFPercentage(1.5) }]}>VIEW RECENT DATA</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.1, flexDirection: 'row', marginBottom: 70, width: DEVICE_WIDTH }}>


        <View style={[tailwind(" flex-1 justify-center "), { alignItems: 'center' }]}>
          <Text style={{ fontWeight: 'bold', fontSize: RFPercentage(2), }}>
            SET LIMIT
          </Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </View>
      </View>
      <View style={[tailwind(' inset-x-0 bottom-0'), styles.textOfLink]}>
        <Text style={{ fontSize: RFPercentage(2) }}>
          University of Science, VNU-HCM{' '}
        </Text>
        <Text style={{ fontSize: RFPercentage(2) }}>
          Power{' '}
          <Text
            style={{ color: 'blue' }}
            onPress={() =>
              Linking.openURL(
                'https://sites.google.com/hcmus.edu.vn/rewes/trang-chủ',
              )
            }>
            ReWES project
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}


export default App;
const styles = StyleSheet.create({
  circle: {
    width: DEVICE_WIDTH - 80,
    height: DEVICE_WIDTH - 80,

    backgroundColor: '#6495ED',
    borderRadius: 2000,
  },
  circleRed: {
    width: DEVICE_WIDTH - 80,
    height: DEVICE_WIDTH - 80,
    backgroundColor: 'red',
    borderRadius: 2000,
  },

  textInput: {
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,

  },
  textOfLink: {
    fontWeight: 'bold',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  viewAllData: {
    width: DEVICE_WIDTH - 250,
    padding: 10,
  },
  viewRecentData: {
    width: DEVICE_WIDTH - 250,
    padding: 10,
  }
});
