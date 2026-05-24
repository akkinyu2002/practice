import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';

export default function AddTransaction({ navigation }){
  const { addTransaction } = useContext(TransactionsContext);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('General');
  const [note, setNote] = useState('');

  async function onSave(){
    const a = parseFloat(amount || 0);
    if(!title || !a){
      Alert.alert('Validation','Please enter title and amount');
      return;
    }
    await addTransaction({ title, amount: a, type, date: new Date().toISOString(), category, note });
    setTitle(''); setAmount(''); setNote('');
    navigation.navigate('Activity');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Transaction</Text>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Amount" value={amount} onChangeText={setAmount} keyboardType="numeric" style={styles.input} />
      <View style={{flexDirection:'row', marginVertical:8}}>
        <TouchableOpacity style={[styles.typeBtn, type==='expense' && styles.typeActive]} onPress={()=>setType('expense')}>
          <Text>Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.typeBtn, type==='income' && styles.typeActive]} onPress={()=>setType('income')}>
          <Text>Income</Text>
        </TouchableOpacity>
      </View>
      <TextInput placeholder="Category" value={category} onChangeText={setCategory} style={styles.input} />
      <TextInput placeholder="Note (optional)" value={note} onChangeText={setNote} style={styles.input} />
      <TouchableOpacity style={styles.save} onPress={onSave}><Text style={{color:'#fff'}}>Save</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:16, backgroundColor:'#f7f8fb'},
  header:{fontSize:22, fontWeight:'700', marginBottom:12},
  input:{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:8},
  typeBtn:{flex:1, padding:12, alignItems:'center', borderRadius:8, backgroundColor:'#fff', marginRight:8},
  typeActive:{backgroundColor:'#d1fae5'},
  save:{backgroundColor:'#0f172a', padding:14, borderRadius:12, alignItems:'center', marginTop:12}
});
