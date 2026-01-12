import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    backgroundColor: '#2E7D32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 14,
  },

  infoLabel: {
    fontSize: 11,
    color: '#6B7280',
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '600',
  },

  card: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 32,
    paddingTop: 44,
    paddingBottom: 20,
    borderRadius: 14,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  avatarLarge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -52,
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  starRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  result: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    color: '#111827',
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 18,
  },

  ulasanText: {
    fontSize: 14,
    color: '#374151',
    marginHorizontal: 16,
    marginTop: 10,
    lineHeight: 22,
  },
});
