import axios from 'axios';
import { SERVICE_KEY } from '@env';

const BASE_URL = 'https://apis.data.go.kr/B551011/KorService1/areaBasedList1';

export const fetchTourData = async (areaCode = '1') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        serviceKey: SERVICE_KEY,
        MobileApp: 'TourismMapApp',
        MobileOS: 'ETC',
        areaCode,
        _type: 'json'
      }
    });
    return response.data.response.body.items.item;
  } catch (error) {
    console.error('API 호출 오류:', error);
    return [];
  }
};