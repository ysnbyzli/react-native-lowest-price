import React from 'react';
import {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../constants';

import {fetchAllCategories, selectCategories} from '../../store/categorySlice';

import CategoryItem from './CategoryItem';

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

  const allCategoryItem = {
    title: 'All',
    image:
      'https://res.cloudinary.com/hrms-camp/image/upload/v1640354072/categories/boxes_hbr9pu.png',
  };

  return (
    <ScrollView
      horizontal
      style={{paddingHorizontal: 10, backgroundColor: COLORS.white}}
      showsHorizontalScrollIndicator={false}>
      <CategoryItem category={allCategoryItem} />
      {categories.map(category => (
        <CategoryItem category={category} key={category._id} />
      ))}
    </ScrollView>
  );
};

export default CategoryList;
