import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import tailwind from 'tailwind-rn';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const Intro = ({ navigation }) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tailwind('p-3 mt-14')}>
          <View
            style={[
              tailwind(' w-full bg-purple-300 rounded-lg p-4 '),
              { backgroundColor: '#bbcfff' },
            ]}>
            <Text
              style={[
                tailwind('text-white font-bold text-base text-justify'),
                {
                  color: '#5f9ea0',
                  fontSize: 16,
                  textAlign: 'justify',
                  letterSpacing: 2,
                },
              ]}>
              DỰ ÁN CỘNG ĐỒNG “QUAN TRẮC MÔI TRƯỜNG THEO THỜI GIAN THỰC WEBSITE
              TRỰC TUYẾN{'\n'}
              <Text style={tailwind('text-white font-bold')}>
                Dự án: ReWE project for Community
              </Text>
              {'\n'}
              <Text style={[tailwind('text-white font-semibold')]}>
                - English: “Real-time Website Environmental monitoring System”
                Project for Community.
              </Text>
              <Text style={tailwind('text-white font-semibold')}>
                {'\n'}- Tên tiếng Việt: Dự án cộng đồng “Quan trắc môi trường
                theo thời gian thực website trực tuyến”.
              </Text>
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
              }}>
              {'\n'}
              Giới thiệu dự án
            </Text>
            <View
              style={{
                height: 3,
                width: 200,
                backgroundColor: '#5f9ea0',
              }}></View>
            <Text
              style={{
                fontSize: 16,
                textAlign: 'justify',
                letterSpacing: 2,
              }}>
              {'\n'}
              Dự án “Quan trắc môi trường thời gian thực Website trực tuyến”
              thực hiện quan trắc các thông số về môi trường (bao gồm phóng xạ,
              các thông số môi trường lý, hóa) theo thời gian thực. Số liệu đo
              sẽ tự động cập nhập một cách liên tục theo thời gian thực và hiển
              thị lên Webpage.{'\n'}
              {'\n'}
              <Text style={tailwind('font-bold')}>
                Các đường truyền dữ liệu được phát triển trong dự án bao gồm:{' '}
              </Text>
              {'\n'}
              {'\n'}
              <Text style={[tailwind('font-bold'), { color: '#5f9ea0' }]}>
                (1) Đường truyền tại trạm đo (USB, WIFI); {'\n'}
                {'\n'}(2) Đường truyền nội bộ (hệ thống mạng nội bộ - LAN);{' '}
                {'\n'}
                {'\n'}(3) Đường truyền mạng internet (mạng WAN), cũng như lưu
                trữ dữ liệu trong database.
              </Text>
              {'\n'}
              {'\n'}
              <Text style={tailwind('font-bold')}>Hình 1.1</Text> trình bày mô
              hình tổng quan về dự án về quan trắc môi trường. Trạm đo
              (Measurement site) thực hiện ghi nhận dữ liệu từ các cảm biến môi
              trường (như phóng xạ, các thành phần lý hóa, v.v.). Các cảm biến
              được kết nối với bộ giao tiếp điện tử DAQ với công nghệ nhúng FPGA
              (Field Programable Gate Array) tích hợp. Dữ liệu đo sẽ được xử lý
              trong FPGA để ghi nhận các thông tin từ cảm biến theo thời gian
              thực và có thể truyền dữ liệu qua đường truyền USB, WIFI, mạng nội
              bộ LAN (Local Site) và mạng WAN (Global site). Đối với dữ liệu
              truyền qua mạng internet (mạng WAN), hệ thống Webserver được phát
              triển cho phép ghi nhận dữ liệu đo tại trạm đo theo thời gian
              thực. Giao thức truyền dữ liệu ra internet thông qua đường truyền
              theo địa chỉ IP ngoài (External IP) cũng như thông qua đường
              truyền 3G. Để thông tin dữ liệu đo trực tuyến trên mạng internet,
              một Website được xây dựng cho phép hiển thị kết quả đo theo thời
              gian thực. Bên cạnh đó, thông tin về vị trí nơi đo cũng được định
              vị và hiển thị dưới dạng Google Map. Dự án quan trắc môi trường
              trực tuyến nhằm mục đích thông tin cho con người biết về mức độ an
              toàn/ô nhiễm về môi trường ở nơi khảo sát và có thể truyền tải đến
              người quan tâm thông qua Website. Dự án này được phát triển bởi
              nhóm nghiên cứu của tiến sĩ Võ Hồng Hải, trường đại học Khoa học
              Tự nhiên, ĐHQG-TPHCM.
            </Text>
          </View>
          <Image
            source={require('../assets/system.png')}
            style={{ height: DEVICE_WIDTH - 140, width: DEVICE_WIDTH - 30 }}
          />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 13,
              letterSpacing: 3,
              fontStyle: 'italic',
            }}>
            Hình 1.1 Dự án cộng đồng “Quan trắc môi trường thời gian thực
            Website trực tuyến”. Thực hiện bởi nhóm nghiên cứu của TS. Võ Hồng
            Hải, Đại học Khoa Tự nhiên – ĐHQG-TPHCM.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Intro;
