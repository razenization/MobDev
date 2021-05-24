import { connection } from '../database/connection';

class ImagesCache {
  constructor() {
    this.images = [];
    this.API_KEY = '19193969-87191e5db266905fe8936d565';
  }

  async get() {
    if (!this.images.length) {
      await this.heal();
    }

    return this.images;
  }

  async heal() {
    return await new Promise((resolve) => {
      connection.transaction((tx) => {
        tx.executeSql(
          'select * from images',
          [],
          async (_, { rows }) => {
            const existingImages = rows._array;

            console.log('existingImages => ', existingImages);

            if (existingImages.length) {
              this.images = existingImages;
              return resolve();
            }

            const result = await this.fetch();

            console.log('result => ', result);

            if (typeof result === Error) {
              throw result;
            }

            this.images = result.map((obj) => ({
              id: obj.id,
              uri: obj.largeImageURL,
            }));

            return resolve();
          },
          (_, error) => {
            console.log('error => ', error);
          },
        );
      });
    });
  }

  async fetch() {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${this.API_KEY}&q=hot+summer&image_type=photo&per_page=24`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { hits: images } = await response.json();

      const dbValues = images
        .map((image) => `(${image.id}, '${image.largeImageURL}')`)
        .join(', ');

      this.images = images;

      connection.transaction((tx) => {
        tx.executeSql(
          `insert into images (id, uri) values ${dbValues}`,
          [],
          () => {
            console.log(
              'Successfully fetched new portion of images and saved it into database.',
            );
          },
          (_, error) => {
            console.log('error => ', error);
          },
        );
      });

      return images;
    } catch (error) {
      console.log('Unable to perform request to external resource:');
      console.log('error => ', error);
      return error;
    }
  }

  clear() {
    this.images = [];
    console.log('Successfully cleared cache.');
  }

  async flush() {
    return await new Promise((resolve) => {
      connection.transaction((tx) => {
        tx.executeSql(
          `delete from images`,
          [],
          (_, resultSet) => {
            console.log('Successfully removed all items from database.');
            resolve();
          },
          (_, error) => {
            console.log('error => ', error);
          },
        );
      });
    });
  }
}

export const imagesCache = new ImagesCache();
