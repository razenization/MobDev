import { StyleSheet, StatusBar } from 'react-native';

const COLOR = '#EEEEEE';

export const landscape = StyleSheet.create({
  textView: {
    flex: 10,
    marginRight: 80,
  },

  poster: {
    width: 70,
    height: 120,
    marginLeft: 12,
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 1,
    backgroundColor: 'white',
    height: 'auto',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 0,
    padding: 20,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 70,
    height: 120,
  },

  imageView: {
    flex: 2,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  textView: {
    flex: 10,
    marginLeft: 28,
  },

  specs: {
    marginTop: 10,
    fontSize: 16,
  },

  // Search style section

  textInputStyle: {
    flex: 1,
    height: 40,
    margin: 2,
    borderRadius: 10,
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',

    height: 40,
    borderRadius: 10,
    margin: 10,
  },

  imageStyle: {
    margin: 5,
  },

  baseText: {
    color: '#949494',
    fontWeight: '600',
    fontSize: 15,
  },

  innerText: {
    color: 'black',
    fontWeight: '400',
  },

  infoScreen: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 40,
    backgroundColor: 'white',
  },

  infoImageSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLOR,

    // shadow
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 2,
  },

  infoImage: {
    width: 380,
    height: 600,
  },

  rightAction: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'red',
  },

  actionText: {
    color: '#fff',
    padding: 20,
    textAlign: 'right',
  },
});
