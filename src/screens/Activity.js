import React, {useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';
import TransactionCard from '../components/TransactionCard';

export default function Activity(){
  const { txs } = useContext(TransactionsContext);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.header}>Activity</Text>
      {(!txs || txs.length===0) && <Text style={{color:'#6b7280'}}>No transactions yet.</Text>}
      {(txs || []).map(t=> <TransactionCard key={t.id} tx={t} />)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#f7f8fb'},
  header:{fontSize:28, fontWeight:'700', marginBottom:12}
});
