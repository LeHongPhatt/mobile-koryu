import {FlatList, View} from 'react-native';
import React from 'react';
import styles from './styles';
import {ImageCus, TextCus, TouchCus} from 'components';
import {getHeight} from 'utils';
import {Divider, List} from 'react-native-paper';
import {Images} from 'assets';

const GroupDriver = () => {
  const renderDriverGroup = item => (
    <>
      <View style={styles.pH16}>
        <List.Item
          title={
            <TextCus body1 useI18n>
              hi
            </TextCus>
          }
          onPress={() => {}}
          left={() => (
            <ImageCus
              source={Images?.[`flash_0${item}`]}
              style={styles.wrapImg}
            />
          )}
        />
      </View>

      <Divider style={getHeight(1)} />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={getHeight(24)} />
      <View style={[styles.row, styles.spaceItem, styles.pH16]}>
        <TextCus mainLightColor body1>
          Nhóm tài xế
        </TextCus>
        <TouchCus onPress={() => {}}>
          <TextCus mainLightColor>Tất cả (63)</TextCus>
        </TouchCus>
      </View>
      <View style={getHeight(12)} />
      <View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => renderDriverGroup(item)}
        />
      </View>
    </View>
  );
};
export default GroupDriver;
