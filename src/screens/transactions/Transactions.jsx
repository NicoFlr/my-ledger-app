import React, {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Text, Card, FAB, Portal, Modal} from 'react-native-paper';
import styles from './TransactionsStyles';
import { getUser } from '../../services/user-service';
import { getStringItem } from '../../services/phone-storage-service';
import {jwtDecode} from 'jwt-decode';
import {PhoneStorage} from '../../constants/phoneStorageConstants.js';
import TransactionModal from '../../components/transaction-modal/TransactionModal.jsx';
import { format, parseISO } from 'date-fns';

export default function Transactions({navigation}) {
  const [currentUserId, setCurrentUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        let storedToken = await getStringItem(PhoneStorage.jwt);
        if (!storedToken) {
          navigation.replace('Login');
          return;
        }
        let decodedToken = jwtDecode(storedToken);
        const response = await getUser(decodedToken.userId);
        setTransactions(response.data.transactions);
        setCurrentUserId(decodedToken.userId);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const openModal = (transaction = null) => {
    setSelectedTransaction(transaction);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    setSelectedTransaction(null);
  };

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  return (
    <View style={styles.transaction__container}>
      <FlatList
        data={transactions}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => openModal(item)}>
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.text}>
                  {item.isBill ? '-' : ''}{item.money} Bs. - {format(parseISO(item.dateTime), 'MM/dd/yyyy')} - {item.category.name}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        )}
      />
      <FAB style={styles.fab} icon="plus" onPress={() => openModal()} />
      <Portal>
        <Modal visible={visible} onDismiss={closeModal} contentContainerStyle={styles.modalContainer}>
          <TransactionModal
            transaction={selectedTransaction}
            onClose={closeModal}
            refreshTransactions={() => getUser(currentUserId).then(res => setTransactions(res.data.transactions))}
          />
        </Modal>
      </Portal>
    </View>
  );
}
