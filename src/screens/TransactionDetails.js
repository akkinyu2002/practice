import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';

export default function TransactionDetails({ route, navigation }){
  const { id } = route.params || {};
  const { txs, updateTransaction, deleteTransaction } = useContext(TransactionsContext);
  const [tx, setTx] = useState(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  useEffect(()=>{
    const found = (txs||[]).find(t=>t.id === id);
    if(found){
      setTx(found);
      setTitle(found.title||''); setAmount(String(found.amount||'')); setCategory(found.category||''); setNote(found.note||'');
    }
  },[id, txs]);

  if(!tx) return <View style={styles.container}><Text style={{color:'#6b7280'}}>Transaction not found.</Text></View>;

  async function onSave(){
    const a = parseFloat(amount || 0);
    if(!title || !a){ Alert.alert('Validation','Title and amount required'); return; }
    await updateTransaction(id, { title, amount: a, category, note });
    navigation.goBack();
  }

  async function onDelete(){
    Alert.alert('Delete','Delete this transaction?',[
      { text:'Cancel', style:'cancel' },
      { text:'Delete', style:'destructive', onPress: async ()=>{ await deleteTransaction(id); navigation.goBack(); } }
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transaction</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} value={amount} onChangeText={setAmount} keyboardType="numeric" />
      <TextInput style={styles.input} value={category} onChangeText={setCategory} />
      <TextInput style={styles.input} value={note} onChangeText={setNote} />
      <TouchableOpacity style={styles.save} onPress={onSave}><Text style={{color:'#fff'}}>Save</Text></TouchableOpacity>
      <TouchableOpacity style={styles.delete} onPress={onDelete}><Text style={{color:'#ef4444'}}>Delete</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, padding:16, backgroundColor:'#f7f8fb'},
  header:{fontSize:22, fontWeight:'700', marginBottom:12},
  input:{backgroundColor:'#fff', padding:12, borderRadius:8, marginBottom:8},
  save:{backgroundColor:'#0f172a', padding:12, borderRadius:8, alignItems:'center', marginTop:8},
  delete:{backgroundColor:'#fff', padding:12, borderRadius:8, alignItems:'center', marginTop:8, borderWidth:1, borderColor:'#fee2e2'}
});
