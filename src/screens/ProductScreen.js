import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, images, SIZES} from '../constants';
import api from '../utils/api';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import Record from '../components/Record';
import {selectUser} from '../store/userSlice';
import Favorite from '../components/Favorite';
import RandomProduct from '../components/RandomProduct';
import {getCalendar} from '../utils/helper';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const headerComponent = (product, drawer) => {
  return (
    <View>
      <ProductImage source={{uri: product?.image}} resizeMode="cover" />
      <Info>
        <View>
          <Title>{product?.title}</Title>
          <Market>{product?.market}</Market>
        </View>
        <View>
          <Price>
            <Text style={{color: COLORS.black, fontFamily: FONTS.semiBold}}>
              Barcod:
            </Text>{' '}
            {product?.barcod}
          </Price>
          <Text
            style={{
              fontFamily: FONTS.regular,
              color: COLORS.gray,
              fontSize: 10,
            }}>
            {getCalendar(product?.createdAt)}
          </Text>
        </View>
      </Info>
      <Desc>{product?.description}</Desc>
      <RecordHeader>
        <AntDesign
          name={'filter'}
          size={22}
          style={{color: '#30336b', marginLeft: 'auto', padding: 10}}
          onPress={() => drawer.current.openDrawer()}
        />
      </RecordHeader>
    </View>
  );
};

const radioProps = [
  {label: 'Price', value: 1},
  {label: 'Market', value: 2},
  {label: 'Date', value: 3},
];

const ProductScreen = ({route, navigation}) => {
  // * drawer
  const drawer = useRef(null);

  const user = useSelector(selectUser);

  const {product_id, isBarcod, barcod} = route.params;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);
  const [records, setRecords] = useState([]);
  // * Filter
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState(false);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);

  const fetchProductById = async () => {
    try {
      const response = await api().get(`/products/${product_id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data);
    }
  };

  const fetchProductByBarcod = async () => {
    try {
      const response = await api().get(`/products/barcod/${barcod}`);
      setProduct(response.data);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const fetchProductRecords = async () => {
    try {
      setLoading(true);
      const response = await api().get(`/products/records/${product._id}`);
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isBarcod) {
      fetchProductByBarcod();
    } else if (product_id) {
      fetchProductById();
    }
  }, []);

  useEffect(() => {
    if (product_id) {
      fetchProductById();
    }
  }, [product_id]);

  useEffect(() => {
    if (product) {
      fetchProductRecords();
    }
  }, [product]);

  const renderRecord = ({item}) => {
    return (
      <Record record={item} navigation={navigation} setSearch={setSearch} />
    );
  };

  const renderRecordKey = item => item._id.toString();

  const searchRecord = records.filter(record =>
    record.market.toLowerCase().includes(search.toLowerCase()),
  );

  const handleFilter = (index, sort) => {
    const number = index - 1;
    const type = radioProps[number].label.toLowerCase();
    if (number === 0) {
      if (sort) return records.sort((a, b) => a.price - b.price);
      return records.sort((a, b) => b.price - a.price);
    }
    if (number === 2) {
      if (sort)
        return records.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      return records.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
    }
    if (sort) return records.sort((a, b) => a[type].localeCompare(b[type]));
    return records.sort((a, b) => b[type].localeCompare(a[type]));
  };

  let filteredRecord =
    !selectedFilterIndex && !sort
      ? records
      : handleFilter(selectedFilterIndex, sort);

  const navigationView = () => {
    return (
      <View style={{padding: 10}}>
        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            backgroundColor: '#ecf0f1',
            borderRadius: 10,
            alignItems: 'center',
          }}>
          <TextInput
            style={{width: '85%', paddingLeft: 15}}
            value={search}
            onChangeText={setSearch}
            placeholder={'Market Search'}
          />
          <AntDesign
            name="search1"
            size={22}
            style={{color: '#30336b', marginLeft: 'auto', padding: 10}}
            onPress={() => drawer.current.openDrawer()}
          />
        </View>
        <FontAwesome
          name={sort ? 'sort-alpha-desc' : 'sort-alpha-asc'}
          size={22}
          style={{marginLeft: 'auto', marginRight: 30, marginVertical: 20}}
          onPress={() => setSort(!sort)}
        />
        <View>
          <RadioForm animation={true}>
            {radioProps.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i + 1}
                style={{marginTop: 15}}>
                <RadioButtonLabel
                  obj={obj}
                  index={i + 1}
                  labelHorizontal={true}
                  onPress={() => {
                    setSelectedFilterIndex(i + 1);
                  }}
                  labelStyle={{
                    fontFamily: FONTS.regular,
                    fontSize: 18,
                    color: COLORS.black,
                  }}
                  labelWrapStyle={{minWidth: '80%'}}
                />
                <RadioButtonInput
                  obj={obj}
                  index={i + 1}
                  isSelected={selectedFilterIndex === i + 1}
                  onPress={() => {
                    setSelectedFilterIndex(i + 1);
                  }}
                  borderWidth={1}
                  buttonInnerColor={COLORS.primary}
                  buttonOuterColor={
                    selectedFilterIndex === i + 1 ? COLORS.black : COLORS.gray
                  }
                  buttonSize={10}
                  buttonOuterSize={25}
                  buttonStyle={{}}
                  buttonWrapStyle={{marginLeft: 10}}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
      </View>
    );
  };

  return (
    <Container
      ref={drawer}
      renderNavigationView={() => navigationView(product)}
      drawerPosition="right">
      <Header>
        <AntDesign
          name="arrowleft"
          size={22}
          style={{color: COLORS.black}}
          onPress={() => navigation.goBack()}
        />
        {user && product && <Favorite product={product} />}
      </Header>
      {error ? (
        <NotFound>
          <NotFoundImage source={images.not_found} resizeMode="contain" />
          <RandomProduct />
        </NotFound>
      ) : (
        <>
          <Body>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size={27} />
              </View>
            ) : (
              <View style={{flex: 1}}>
                {records.length > 0 ? (
                  <FlatList
                    data={search ? searchRecord : filteredRecord}
                    renderItem={renderRecord}
                    keyExtractor={renderRecordKey}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={headerComponent(product, drawer)}
                  />
                ) : (
                  <>
                    {headerComponent(product)}
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={images.empty}
                        style={{width: SIZES.width * 0.8, height: 320}}
                        resizeMode="cover"
                      />
                    </View>
                  </>
                )}
              </View>
            )}
          </Body>
        </>
      )}
    </Container>
  );
};

const Container = styled.DrawerLayoutAndroid`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Body = styled.View`
  flex: 1;
  padding: 10px;
`;

const ProductImage = styled.Image`
  height: ${SIZES.height / 3}px;
  min-width: 100%;
  border-radius: 15px;
`;

const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Desc = styled.Text`
  margin-top: 10px;
  text-align: justify;
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
`;

const Market = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.gray};
  font-size: 10px;
`;

const Title = styled.Text`
  font-family: ${FONTS.bold};
  color: ${COLORS.black};
  font-size: 14px;
`;

const Price = styled.Text`
  font-family: ${FONTS.regular};
  color: ${COLORS.black};
  font-size: 10px;
`;

const RecordHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const NotFound = styled.View`
  flex: 1;
  align-items: center;
`;

const NotFoundImage = styled.Image`
  width: ${SIZES.width * 0.8}px;
  height: 300px;
`;

export default ProductScreen;
