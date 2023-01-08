import getCityInfo from '../MODEL/getcity';
import { cities } from '../MODEL/locations';
import render from './rendering';

function locationHandle(event) {
  const { cityname } = event.target.dataset;
  if (cityname) {
    render(getCityInfo(cityname, cities.lang));
  }
}

export default locationHandle;
