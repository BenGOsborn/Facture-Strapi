module.exports = {
  init(providerOptions) {
    // init your provider if necessary
    console.log("Initializing", providerOptions);

    return {
      upload(file) {
        console.log("Uploading...");

        // upload the file in the provider
        // file content is accessible by `file.buffer`
      },
      uploadStream(file) {
        // upload the file in the provider
        // file content is accessible by `file.stream`
      },
      delete(file) {
        console.log("Deleting...");

        // delete the file in the provider
      },
    };
  },
};
