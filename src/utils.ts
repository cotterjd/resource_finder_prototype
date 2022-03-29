// import data from './resources'
import csvtojson from 'csvtojson'

const getCSVData = async () => {
  return csvtojson().fromFile('./data.csv')
}

export default getCSVData 