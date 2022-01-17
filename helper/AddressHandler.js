class AddressHandler {
  getAddress(addressRowData) {
    if ("address" in addressRowData) {
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
}
export default new AddressHandler();
