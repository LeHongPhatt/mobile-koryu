import {FlatList, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {Buttons, IconCus, ImageCus, TextCus, TouchCus} from 'components';
import {getHeight} from 'utils';
import {Card} from 'react-native-paper';
import {Images} from 'assets';
import Icon from 'assets/svg/Icon';
import {Colors} from 'theme';

const SponsoredBy = () => {
  const renderItems = item => (
    <>
      <TouchCus
        key={item}
        onPress={() => {}}
        style={[styles.pl16, styles.radius7]}>
        <Card style={styles.wrapBlock}>
          <ImageCus source={Images.image20} style={styles.wrapImg} />
          <View style={styles.pv16}>
            <Card.Content>
              <TextCus>
                Chương trình mua xe trả góp ưu đãi 0% cho 12 tháng Sacombank
              </TextCus>
            </Card.Content>
          </View>
        </Card>
      </TouchCus>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={getHeight(24)} />
      <View style={[styles.row, styles.spaceItem, styles.pH16]}>
        <TextCus mainLightColor body1>
          Được Tài Trợ
        </TextCus>
        <TouchCus onPress={() => {}}>
          <TextCus mainLightColor>Tất cả (12)</TextCus>
        </TouchCus>
      </View>
      <View style={getHeight(12)} />
      <View>
        <FlatList
          data={[1, 2]}
          // scrollEnabled={false}
          horizontal
          style={styles.pb6}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderItems(item)}
        />
      </View>
      <View style={getHeight(12)} />
      <View style={styles.pH16}>
        <View style={[styles.p8, styles.wrapBlockAdv]}>
          <View style={[styles.row, styles.cenItem]}>
            <Icon.Gift />
            <TextCus body2> Tích dặm thưởng không giới hạn</TextCus>
          </View>
          <View style={[styles.wrapInnerBlockAdv]}>
            <TextCus caption1>
              Mở thẻ premier Boundless VIB nhận ngay quà tặng 2000 dặm thưởng
              bông sen vàng. Xem ngay!
            </TextCus>
            <View style={getHeight(8)} />
            <View style={[styles.row, styles.spaceItem]}>
              <Buttons
                style={styles.btnAdv}
                onPress={() => {
                  // NavigationService.navigate(Routes.OTP, {
                  //   phone: getValues('account'),
                  // });
                }}
                disabled={false}>
                <TextCus body2>Ngân hàng Quốc Tế VIB</TextCus>
              </Buttons>
              <TouchCus onPress={() => {}} style={[styles.row, styles.cenItem]}>
                <TextCus body2>Chi tiết </TextCus>
                <IconCus name={'arrow-right'} size={18} color={Colors.main} />
              </TouchCus>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default SponsoredBy;
