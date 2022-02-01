class AddressHandler {
  getAddress(addressRowData) {
    if (addressRowData.hasOwnProperty("address")) {
      let place_name = addressRowData.place_name;
      const pattern = /(.*), (.*), (\S+) (.*), (.*)/;
      const address = place_name.split(pattern);
      const addressObject = {
        street: address[1],
        city: address[2],
        province: address[3],
        zip: address[4],
        country: address[5],
        latitude: addressRowData.center[1],
        longitude: addressRowData.center[0],
      };
      return addressObject;
    } else {
      return null;
    }
  }
  getAddressString(addressObject) {
    let addressString = "";
    addressString =
      addressObject.street +
      ", " +
      addressObject.city +
      ", " +
      addressObject.province +
      ", " +
      addressObject.zip +
      ", " +
      addressObject.country;
    return addressString;
  }
  getSearchAddress(addressRowData) {
    if (addressRowData.hasOwnProperty("address")) {
      let place_name = addressRowData.place_name;
      const pattern = /(.*), (.*), (\S+) (.*), (.*)/;
      const address = place_name.split(pattern);
      const addressObject = {
        city: address[2],
        province: address[3],
        country: address[5],
      };
      return addressObject;
    } else {
      let place_name = addressRowData.place_name;
      const pattern = /(.*), (.*), (.*)/;
      const address = place_name.split(pattern);
      const addressObject = {
        city: address[1],
        province: address[2],
        country: address[3],
      };
      return addressObject;
    }
  }
  getSearchAddressQuery(addressRowData) {
    const pattern = /(.*), (.*), (.*)/;
    const address = addressRowData.split(pattern);
    const addressObject = {
      city: address[1],
      province: address[2],
      country: address[3],
    };
    return addressObject;
  }
  getSearchAddressString(addressObject) {
    if (addressObject.hasOwnProperty("street")) {
      let addressString = "";
      addressString =
        addressObject.street +
        ", " +
        addressObject.city +
        ", " +
        addressObject.province +
        ", " +
        addressObject.zip +
        ", " +
        addressObject.country;
      return addressString;
    } else {
      let addressString = "";
      addressString =
        addressObject.city +
        ", " +
        addressObject.province +
        ", " +
        addressObject.country;
      return addressString;
    }
  }
}
export default new AddressHandler();
