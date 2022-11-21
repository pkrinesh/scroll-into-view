import { Entypo, Feather } from '@expo/vector-icons';
import faker from 'faker';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('screen');

faker.seed(10);

const data = [...Array(20).keys()].map(() => ({
  key: faker.datatype.uuid(),
  job: faker.animal.crocodilia(),
}));

const _colors = {
  active: `#FCD259ff`,
  inactive: `#FCD25900`,
};
const _spacing = 10;

export default function UberEats() {
  const ref = React.useRef(null);
  const [index, setIndex] = React.useState(0);
  const [viewPosition, setViewPosition] = React.useState(0);

  React.useEffect(() => {
    ref.current?.scrollToIndex({
      index,
      viewOffset: viewPosition === 0 ? _spacing : 0,
      animated: true,
      viewPosition, // percentage from the viewport stating from left handside
    });
  }, [index, viewPosition]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <FlatList
        ref={ref}
        initialScrollIndex={index}
        style={{ flexGrow: 0 }}
        data={data}
        keyExtractor={(item) => item.key}
        contentContainerStyle={{ paddingLeft: _spacing }}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item, index: fIndex }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setIndex(fIndex);
              }}>
              <View
                style={{
                  marginRight: _spacing,
                  padding: _spacing,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                  backgroundColor:
                    fIndex === index ? _colors.active : _colors.inactive,
                }}>
                <Text style={{ color: '#36303F', fontWeight: '700' }}>
                  {item.job}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: _spacing * 10,
        }}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              color: '#36303F',
              fontWeight: '700',
              marginBottom: _spacing,
            }}>
            Scroll position
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0);
              }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Entypo name="align-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0.5);
              }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Entypo
                  name="align-horizontal-middle"
                  size={24}
                  color="#36303F"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(1);
              }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}>
                <Entypo name="align-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{ color: '#36303F', fontWeight: '700', marginBottom: 10 }}>
            Navigation
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: width / 2,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }

                setIndex(index - 1);
              }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                  marginRight: _spacing,
                }}>
                <Feather name="arrow-left" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (index === data.length) {
                  return;
                }

                setIndex(index + 1);
              }}>
              <View
                style={{
                  padding: _spacing,
                  backgroundColor: '#FCD259',
                  borderRadius: _spacing,
                }}>
                <Feather name="arrow-right" size={24} color="#36303F" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
