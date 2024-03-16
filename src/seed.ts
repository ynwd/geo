import { AppDataSource } from './data-source';
import { Geo } from './geo/geo.entity';

AppDataSource.initialize()
  .then(async () => {
    console.log('Inserting a new data into the database...');
    const geo = new Geo();
    geo.name = 'tes';
    geo.data = [];
    await AppDataSource.manager.save(geo);
    console.log('Saved a new geo with id: ' + geo.id);

    console.log('Loading data from the database...');
    const geoData = await AppDataSource.manager.find(Geo);
    console.log('Loaded data: ', geoData);
  })
  .catch((error) => console.log(error));
