import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    width: '47%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    elevation: 6,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 110,
    resizeMode: 'contain',
  },
  category: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  weight: {
    fontSize: 12,
    color: '#666',
  },
  price: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#00aa66',
    paddingVertical: 4,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnText: {
    color: '#00aa66',
  }
});
