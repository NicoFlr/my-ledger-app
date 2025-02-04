import React, {useState, useEffect} from 'react';
//import {View} from 'react-native';
import {TextInput, Button, Dialog, Portal} from 'react-native-paper';
import {createTransaction, updateTransaction} from '../../services/transaction-service';
//import styles from './TransactionStyles';

export default function TransactionModal({transaction, onClose, refreshTransactions}) {
  const [money, setMoney] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [isBill, setIsBill] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    if (transaction) {
      setMoney(transaction.money.toString());
      setDateTime(transaction.dateTime);
      setIsBill(transaction.isBill);
      setCategoryName(transaction.category.name);
    }
  }, [transaction]);

  const handleSave = async () => {
    try {
      if (transaction) {
        await updateTransaction(transaction.id, {money, dateTime, isBill, category: {name: categoryName}});
      } else {
        await createTransaction({money, dateTime, isBill, category: {name: categoryName}});
      }
      refreshTransactions();
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <Portal>
      <Dialog visible={true} onDismiss={onClose}>
        <Dialog.Title>{transaction ? 'Edit Transaction' : 'New Transaction'}</Dialog.Title>
        <Dialog.Content>
          <TextInput label="Amount" value={money} onChangeText={setMoney} keyboardType="numeric" />
          <TextInput label="Date" value={dateTime} onChangeText={setDateTime} />
          <TextInput label="Role" value={categoryName} onChangeText={setCategoryName} />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
