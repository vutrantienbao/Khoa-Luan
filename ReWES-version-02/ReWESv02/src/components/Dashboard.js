import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';



const Dashboard = ({ navigation }) => {


  const fetchData = async (stationNum) => {
    const response = await fetch(`http://api-rewes.glitch.me/station/${stationNum}`);
    const responseJson = await response.text();
    return responseJson;
  }




  const [one, setOne] = useState("null");
  const [two, setTwo] = useState("null");
  const [three, setThree] = useState("null");
  const [four, setFour] = useState("null");
  const [five, setFive] = useState("null");
  const [six, setSix] = useState("null");
  const [RealTime, setRealTime] = useState('0');






  const [checkOldOne, setCheckOldOne] = useState('0');
  const [checkRecentOne, setCheckRecentOne] = useState('0');
  const [checkRecentTwo, setCheckRecentTwo] = useState('0');
  const [checkOldTwo, setCheckOldTwo] = useState('0');
  const [checkRecentThree, setCheckRecentThree] = useState('0');
  const [checkOldThree, setCheckOldThree] = useState('0');
  const [checkRecentFour, setCheckRecentFour] = useState('0');
  const [checkOldFour, setCheckOldFour] = useState('0');
  const [checkRecentFive, setCheckRecentFive] = useState('0');
  const [checkOldFive, setCheckOldFive] = useState('0');
  const [checkRecentSix, setCheckRecentSix] = useState('0');
  const [checkOldSix, setCheckOldSix] = useState('0');






  const checkStation = (number, setCheckRecentStation) => {
    fetchData(number).then(dataJSON => {
      setCheckRecentStation(JSON.parse(dataJSON)[0].realtime);
    })

  }





  let date = new Date();
  let time =
    date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();








  const station = (number, setStation, setCheckRecentStation, setCheckOldStation, checkRecentStation, checkOldStation) => {
    fetchData(number).then(dataJSON => {
      checkStation(number, setCheckRecentStation);
      if (checkOldStation !== checkRecentStation) {
        setStation(JSON.parse(dataJSON)[0].uSv);
        setTimeout(function () {
          setCheckOldStation(checkRecentStation);
        }, 3000);
      }
      else {
        setStation("null");
      }

    })

  }




  useEffect(() => {
    let mounted = true
    if (mounted) {
      let timer = setTimeout(() => { setRealTime(time); }, 6000);
      timer;
      station(1, setOne, setCheckOldOne, setCheckRecentOne, checkOldOne, checkRecentOne);
      station(2, setTwo, setCheckOldTwo, setCheckRecentTwo, checkOldTwo, checkRecentTwo);
      /*station(3, setThree, setCheckOldThree, setCheckRecentThree, checkOldThree, checkRecentThree);
      station(4, setFour, setCheckOldFour, setCheckRecentFour, checkOldFour, checkRecentFour);
     station(5, setFive, setCheckOldFive, setCheckRecentFive, checkOldFive, checkRecentFive);
     station(6, setSix, setCheckOldSix, setCheckRecentSix, checkOldSix, checkRecentSix); */
      return () => {
        clearTimeout(timer);
        mounted = false;
      }
    }

  }, [RealTime]);




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          marginTop: 50,
          flex: 0.25,
          flexDirection: 'row',
        }}>
        <View style={[styles.box, { backgroundColor: '#bbcfff' }]}>
          <View style={styles.viewTitle}>
            <Image source={require('../assets/atom.png')} style={styles.icon} />
            <Text style={[styles.textTitle, { color: 'white' }]}>TRẠM 1</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: 'white' }]}>{`${one}`}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.viewTitle}>
            <Image source={require('../assets/atom.png')} style={styles.icon} />
            <Text style={[styles.textTitle, { color: '#bbcfff' }]}>TRẠM 2</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: '#bbcfff' }]}>{two}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
        }}>
        <View style={styles.box}>
          <View style={styles.viewTitle}>
            <Image
              source={require('../assets/atom.png')}
              style={styles.icon}
            />
            <Text style={[styles.textTitle, { color: '#bbcfff' }]}>TRẠM 3</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: '#bbcfff' }]}>{three}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
        <View style={[styles.box, { backgroundColor: '#bbcfff' }]}>
          <View style={styles.viewTitle}>
            <Image source={require('../assets/atom.png')} style={styles.icon} />
            <Text style={[styles.textTitle, { color: 'white' }]}>TRẠM 4</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: 'white' }]}>{four}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 0.25,
          flexDirection: 'row',
        }}>
        <View style={[styles.box, { backgroundColor: '#bbcfff' }]}>
          <View style={styles.viewTitle}>
            <Image source={require('../assets/atom.png')} style={styles.icon} />
            <Text style={[styles.textTitle, { color: 'white' }]}>TRẠM 5</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: 'white' }]}>{five}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.viewTitle}>
            <Image
              source={require('../assets/atom.png')}
              style={styles.icon}
            />
            <Text style={[styles.textTitle, { color: '#bbcfff' }]}>TRẠM 6</Text>
          </View>
          <View style={styles.viewTitle}>
            <Text style={[styles.data, { color: '#bbcfff' }]}>{six}</Text>
            <Text style={styles.unit}>µSv/h</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  box: {
    flex: 1,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textTitle: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  viewTitle: {
    flex: 0.4,
    flexDirection: 'row',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  unit: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'rgb(26, 180, 150)',
  },
  data: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});
