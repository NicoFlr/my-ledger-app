import React, {useState, useEffect, useCallback} from 'react';
import {TextInput, Button, Dialog, Portal, Menu} from 'react-native-paper';
import {createTransactionForUser, updateTransaction} from '../../services/transaction-service';
import {DatePickerModal  } from 'react-native-paper-dates';
import { TouchableOpacity } from 'react-native';
import { format, parseISO } from 'date-fns';
import { getAllCategories } from '../../services/category-service';
import { getStringItem } from '../../services/phone-storage-service';
import {PhoneStorage} from '../../constants/phoneStorageConstants.js';
import {jwtDecode} from 'jwt-decode';

const transactionBase = {
  money: '',
  dateTime: '',
  isBill: true,
  categoryId: '',
};

export default function TransactionModal({transaction, onClose, refreshTransactions}) {
  const [transactionForm, setTransactionForm] = useState(transactionBase);
  const [categories, setCategories] = useState([]);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [billMenuVisible, setBillMenuVisible] = useState(false);

  const fillData = useCallback(() => {
    if (transaction) {
      setTransactionForm((prevTransactionForm) => ({
        ...prevTransactionForm,
        money: transaction.money,
        dateTime: transaction.dateTime,
        isBill: transaction.isBill,
        categoryId: transaction.categoryId,
      }));
    }
  }, [transaction]);

  useEffect(() => {
    fillData();

    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (error) {
        console.error(`Error fetching categories: ${error}`);
      }
    };
    fetchCategories();
  }, [transaction,fillData]);

  const handleSave = async () => {
    try {
      let storedToken = await getStringItem(PhoneStorage.jwt);
      let decodedToken = jwtDecode(storedToken);
      const formattedDate = new Date(transactionForm.dateTime).toISOString();
      const transactionData = { ...transactionForm, dateTime: formattedDate };
      if (transaction) {
        await updateTransaction(transaction.id, transactionData);
      } else {
        await createTransactionForUser(decodedToken.userId,transactionData);
      }
      refreshTransactions();
      onClose();
    } catch (error) {
      console.error(`Error saving transaction: ${error}`);
    }
  };

  const handleDateChange = (params) => {
    if (params.date) {
      const formattedDate = params.date.toISOString();
      setTransactionForm((prev) => ({ ...prev, dateTime: formattedDate }));
    }
    setDatePickerVisible(false);
  };

  const changeTransactionForm = (value, attribute) => {
    setTransactionForm((prevTransactionForm) => ({
      ...prevTransactionForm,
      [attribute]: value,
    }));
  };
 
  const formattedDate = transactionForm.dateTime
    ? format(parseISO(transactionForm.dateTime), 'MM/dd/yyyy')
    : '';

  return (
    <Portal>
      <Dialog visible={true} onDismiss={onClose}>
        <Dialog.Title>{transaction ? 'Edit Transaction' : 'New Transaction'}</Dialog.Title>
        <Dialog.Content>
        <TextInput
          label="Amount"
          value={transactionForm.money.toString()}
          onChangeText={(text) => changeTransactionForm(text, 'money')}
          keyboardType="numeric"
        />
        <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
          <TextInput
            label="Date"
            value={formattedDate}
            editable={false}
          />
        </TouchableOpacity>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
              <TextInput
                label="Category"
                value={
                  categories.find((cat) => cat.id === transactionForm.categoryId)?.name || ''
                }
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }
        >
          {categories.map((category) => (
            <Menu.Item
              key={category.id}
              onPress={() => {
                changeTransactionForm(category.id, 'categoryId');
                setMenuVisible(false);
              }}
              title={category.name}
            />
          ))}
        </Menu>
        <Menu
          visible={billMenuVisible}
          onDismiss={() => setBillMenuVisible(false)}
          anchor={
            <TouchableOpacity onPress={() => setBillMenuVisible(true)}>
              <TextInput
                label="Transaction Type"
                value={transactionForm.isBill ? "Bill" : "Invoice"}
                editable={false}
                pointerEvents="none"
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            key="bill"
            onPress={() => {
              changeTransactionForm(true, 'isBill');
              setBillMenuVisible(false);
            }}
            title="Bill"
          />
          <Menu.Item
            key="invoice"
            onPress={() => {
              changeTransactionForm(false, 'isBill');
              setBillMenuVisible(false);
            }}
            title="Invoice"
          />
        </Menu>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onClose}>Cancel</Button>
          <Button onPress={handleSave}>Save</Button>
        </Dialog.Actions>
      </Dialog>
      <DatePickerModal
        mode='single'
        visible={isDatePickerVisible}
        onDismiss={() => setDatePickerVisible(false)}
        date={transactionForm.dateTime ? new Date(transactionForm.dateTime) : new Date()}
        onConfirm={handleDateChange}
        locale="en-GB"
      />
    </Portal>
  );
}
