const AWS = require("aws-sdk");

module.exports = {
  init(config) {
    const S3 = new AWS.S3({
      apiVersion: "2006-03-01",
      ...config,
    });

    const uploadFile = (file, customParams = {}) =>
      new Promise((resolve, reject) => {
        const path = file.path ? `${file.path}/` : "";
        const key = `${path}${file.hash}${file.ext}`;
        const body = file.stream || Buffer.from(file.buffer, "binary");

        S3.upload(
          {
            Key: key,
            Body: body,
            ContentType: file.mime,
            ...customParams,
          },
          (err, data) => {
            if (err) return reject(err);

            file.url = data.Location;
            resolve();
          }
        );
      });

    const deleteFile = (file, customParams = {}) =>
      new Promise((resolve, reject) => {
        const path = file.path ? `${file.path}/` : "";
        const key = `${path}${file.hash}${file.ext}`;

        S3.deleteObject({ Key: key, ...customParams }, (err, data) => {
          if (err) return reject(err);

          resolve();
        });
      });

    return {
      uploadStream(file, customParams = {}) {
        return uploadFile(file, customParams);
      },

      upload(file, customParams = {}) {
        return uploadFile(file, customParams);
      },

      delete(file, customParams = {}) {
        return deleteFile(file, customParams);
      },
    };
  },
};
