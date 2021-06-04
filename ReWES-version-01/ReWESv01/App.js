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

  const fetchData = async (stationNum) => {
    const response = await fetch(`http://api-rewes.glitch.me/station/${stationNum}`);
    const responseJson = await response.text();
    return responseJson;
  }

  const [dose1, setDose1] = useState(0);
  const [cps1, setCPS1] = useState(0);
  const [temp1, setTemp1] = useState(0);
  const [humi1, setHumi1] = useState(0);
  const [dose2, setDose2] = useState(0);
  const [cps2, setCPS2] = useState(0);
  const [temp2, setTemp2] = useState(0);
  const [humi2, setHumi2] = useState(0);
  const [dose3, setDose3] = useState(0);
  const [cps3, setCPS3] = useState(0);
  const [temp3, setTemp3] = useState(0);
  const [humi3, setHumi3] = useState(0);
  const [dose4, setDose4] = useState(0);
  const [cps4, setCPS4] = useState(0);
  const [temp4, setTemp4] = useState(0);
  const [humi4, setHumi4] = useState(0);
  const [dose5, setDose5] = useState(0);
  const [cps5, setCPS5] = useState(0);
  const [temp5, setTemp5] = useState(0);
  const [humi5, setHumi5] = useState(0);
  const [dose6, setDose6] = useState(0);
  const [cps6, setCPS6] = useState(0);
  const [temp6, setTemp6] = useState(0);
  const [humi6, setHumi6] = useState(0);
  const [totalCounts1, setTotalCounts1] = useState(0);
  const [totalCounts2, setTotalCounts2] = useState(0);
  const [totalCounts3, setTotalCounts3] = useState(0);
  const [totalCounts4, setTotalCounts4] = useState(0);
  const [totalCounts5, setTotalCounts5] = useState(0);
  const [totalCounts6, setTotalCounts6] = useState(0);
  const [stationTime1, setStationTime1] = useState(0);
  const [stationTime2, setStationTime2] = useState(0);
  const [stationTime3, setStationTime3] = useState(0);
  const [stationTime4, setStationTime4] = useState(0);
  const [stationTime5, setStationTime5] = useState(0);
  const [stationTime6, setStationTime6] = useState(0);

  const arraySetDose = [setDose1, setDose2, setDose3, setDose4, setDose5, setDose6];
  const arraySetCPS = [setCPS1, setCPS2, setCPS3, setCPS4, setCPS5, setCPS6];
  const arraySetTemp = [setTemp1, setTemp2, setTemp3, setTemp4, setTemp5, setTemp6];
  const arraySetHumi = [setHumi1, setHumi2, setHumi3, setHumi4, setHumi5, setHumi6];
  const arrayDose = [dose1, dose2, dose3, dose4, dose5, dose6];
  const arrayCPS = [cps1, cps2, cps3, cps4, cps5, cps6];
  const arrayTemp = [temp1, temp2, temp3, temp4, temp5, temp6];
  const arrayHumi = [humi1, humi2, humi3, humi4, humi5, humi6];

  const arrayTotalCounts = [totalCounts1, totalCounts2, totalCounts3, totalCounts4, totalCounts5, totalCounts6];
  const arraySetTotalCounts = [setTotalCounts1, setTotalCounts2, setTotalCounts3, setTotalCounts4, setTotalCounts5, setTotalCounts6];

  const arrayStationTime = [stationTime1, stationTime2, stationTime3, stationTime4, stationTime5, stationTime6];
  const arraySetStationTime = [setStationTime1, setStationTime2, setStationTime3, setStationTime4, setStationTime5, setStationTime6];

  const [handleClick, setHandleClick] = useState(1);
  const [RealTime, setRealTime] = useState('0');

  const [value, onChangeText] = useState('3');
  const [station, setStation] = useState(1);




  const [checkOld1, setCheckOld1] = useState('0');
  const [checkRecent1, setCheckRecent1] = useState('0');
  const [checkRecent2, setCheckRecent2] = useState('0');
  const [checkOld2, setCheckOld2] = useState('0');
  const [checkRecent3, setCheckRecent3] = useState('0');
  const [checkOld3, setCheckOld3] = useState('0');
  const [checkRecent4, setCheckRecent4] = useState('0');
  const [checkOld4, setCheckOld4] = useState('0');
  const [checkRecent5, setCheckRecent5] = useState('0');
  const [checkOld5, setCheckOld5] = useState('0');
  const [checkRecent6, setCheckRecent6] = useState('0');
  const [checkOld6, setCheckOld6] = useState('0');

  const arraySetCheckOld = [setCheckOld1, setCheckOld2, setCheckOld3, setCheckOld4, setCheckOld5, setCheckOld6];
  const arraySetCheckRecent = [setCheckRecent1, setCheckRecent2, setCheckRecent3, setCheckRecent4, setCheckRecent5, setCheckRecent6];
  const arrayCheckOld = [checkOld1, checkOld2, checkOld3, checkOld4, checkOld5, checkOld6];
  const arrayCheckRecent = [checkRecent1, checkRecent2, checkRecent3, checkRecent4, checkRecent5, checkRecent6];


  const arrayOfArrayValue = [arrayDose, arrayCPS, arrayTotalCounts, arrayStationTime];
  const arrayOfArrayUnit = ["µSv/h", "cps", "Total", ""];
  let today = new Date();
  let date =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();



  const memorizedFunction = useCallback(() => {
    if (handleClick === 4) {
      setHandleClick(1);

    } else {
      setHandleClick(handleClick + 1);

    }
  })




  const nFormatter = ((num, digits) => {
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
  })

  const stationz = (number) => {

    fetchData(number).then(dataJSON => {
      arraySetCheckRecent[number - 1](JSON.parse(dataJSON)[0].realtime);
      /* console.log(arrayCheckRecent[number - 1]); */
      if ((arrayCheckOld[number - 1] !== arrayCheckRecent[number - 1])) {

        arraySetDose[number - 1](parseFloat(JSON.parse(dataJSON)[0].uSv));
        arraySetCPS[number - 1](parseFloat(JSON.parse(dataJSON)[0].cps));
        arraySetTemp[number - 1](JSON.parse(dataJSON)[0].tempC);
        arraySetTotalCounts[number - 1](JSON.parse(dataJSON)[0].counts);
        arraySetHumi[number - 1](JSON.parse(dataJSON)[0].humi);
        arraySetStationTime[number - 1](JSON.parse(dataJSON)[0].date);
        /* console.log(arrayStationTime[number - 1]); */
        setTimeout(function () {
          arraySetCheckOld[number - 1](arrayCheckRecent[number - 1]);
        }, 4000);
      }
      else {
        arraySetDose[number - 1]("null");
        arraySetTemp[number - 1]("null");
        arraySetHumi[number - 1]("null");
        arraySetCPS[number - 1]("null");
        arraySetTotalCounts[number - 1]("null");
      }


    })
  }



  useEffect(() => {
    let mounted = true
    if (mounted) {
      try {
        stationz(station);
        let timer1 = setTimeout(() => {

          setRealTime(date);
        }, 1000);
        timer1;
      }
      catch (err) {
        console.log(err);
      }
    }
  }, [RealTime])

  let touchProps = typeof (arrayOfArrayValue[handleClick - 1][station - 1]) === "string" ? { style: styles.circle } : {
    style:
      parseFloat(arrayOfArrayValue[handleClick - 1][station - 1]) >= parseFloat(value) ? styles.circleRed : styles.circle,
  };
  /* let responsiveFont = DEVICE_WIDTH <= 360 ? 1.3 : 1.5; */
  return (
    <SafeAreaView
      style={styles.contain}>
      <View
        style={tailwind(
          ' bg-white h-12 w-full items-center justify-center flex flex-row justify-between px-4',
        )}>
        <Text style={[tailwind("font-bold text-red-700"), styles.fontsize3]}>{arrayTemp[station - 1]} °C</Text>
        <Text style={[tailwind('font-bold text-blue-700'), styles.fontsize3]}>
          {RealTime}
        </Text>
        <Text style={[tailwind("font-bold text-red-700"), styles.fontsize3]}>{arrayHumi[station - 1]} %</Text>
      </View>

      <View style={[tailwind("flex flex-row"), styles.containCircle]}>

        <View {...touchProps}>
          <AnimatedWave
            sizeOvan={200}
            colorOvan={typeof (arrayOfArrayValue[handleClick - 1][station - 1]) === "string" ? '#008B8B' : (
              parseFloat(arrayOfArrayValue[handleClick - 1][station - 1]) >= parseFloat(value) ? 'red' : '#008B8B')
            }
            zoom={2}
            value={typeof (arrayOfArrayValue[handleClick - 1][station - 1]) !== "string" ? ((arrayOfArrayValue[handleClick - 1][station - 1] < 10) ? arrayOfArrayValue[handleClick - 1][station - 1] : nFormatter(arrayOfArrayValue[handleClick - 1][station - 1])) : (arrayOfArrayValue[handleClick - 1][station - 1]).substr(11, 8)}
            onPress={memorizedFunction}
            unit={arrayOfArrayUnit[handleClick - 1]}
          />
        </View>
      </View>

      <View style={[tailwind("justify-between"), { flex: 0.2, flexDirection: 'row', width: DEVICE_WIDTH }]}>
        <View style={[tailwind("h-12 flex-1 justify-center "), { alignItems: 'center' }]}>
          <TouchableOpacity style={[tailwind("rounded-lg bg-purple-600 flex justify-center items-center"), styles.viewAllData]} onPress={() =>
            Linking.openURL(
              'https://api-rewes.glitch.me',
            )
          } ><Text style={[tailwind("text-white font-bold"), { fontSize: RFPercentage(1.5) }]}>VIEW ALL DATA</Text>
          </TouchableOpacity>
        </View>
        <View style={[tailwind("h-12 flex-1 justify-center"), { alignItems: 'center' }]}>
          <TouchableOpacity style={[tailwind("rounded-lg bg-purple-600 flex justify-center items-center"), styles.viewRecentData]} onPress={() =>
            Linking.openURL(
              'https://api-rewes.glitch.me/station/1',
            )
          } ><Text style={[tailwind("text-white font-bold"), { fontSize: RFPercentage(1.5) }]}>VIEW RECENT DATA</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 0.1, flexDirection: 'row', marginBottom: 70, width: DEVICE_WIDTH }}>

        <View style={[tailwind(" flex-1 justify-center "), { alignItems: 'center' }]}>
          <DropDownPicker
            items={[
              { label: 'Station 1', value: 1, },
              { label: 'Station 2', value: 2, },
              { label: 'Station 3', value: 3, },
              { label: 'Station 4', value: 4, },
              { label: 'Station 5', value: 5, },
              { label: 'Station 6', value: 6, },
            ]}
            defaultValue={station}
            containerStyle={{ height: 45 }}
            style={{ backgroundColor: '#fafafa', width: 120, }}
            itemStyle={{
              justifyContent: 'flex-start'
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => {
              setStation(
                item.value);
            }}
          />
        </View>
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
  contain: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  fontsize3: {
    fontSize: RFPercentage(3)
  },
  containCircle: {
    flex: 0.7,
    marginTop: 40,
    marginBottom: 10,
  },

  circle: {
    width: DEVICE_WIDTH - 80,
    height: DEVICE_WIDTH - 80,

    backgroundColor: '#008B8B',
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
