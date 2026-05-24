import React, {useContext} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { TransactionsContext } from '../context/TransactionsContext';
import TransactionCard from '../components/TransactionCard';
import Header from '../components/Header';
import { Colors } from '../theme';

export default function Dashboard(){
  const { txs } = useContext(TransactionsContext);

  const total = (txs || []).reduce((s,t)=>s + (t.type === 'income' ? t.amount : -t.amount), 0);

  const income = (txs || []).filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0);
  const spend = (txs || []).filter(t=>t.type!=='income').reduce((s,t)=>s+t.amount,0);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Header title="Overview" />

      <View style={styles.balanceCard}>
        <Text style={styles.small}>Total Balance</Text>
        <Text style={styles.balance}>${total.toFixed(2)}</Text>
        <View style={styles.rowSplit}>
          <View style={styles.moneyCol}>
            <Text style={styles.moneyLabel}>Monthly Income</Text>
            <Text style={[styles.moneyValue,{color: Colors.primary}]}>${income.toFixed(2)}</Text>
          </View>
          <View style={styles.moneyCol}>
            <Text style={styles.moneyLabel}>Monthly Spend</Text>
            <Text style={[styles.moneyValue,{color: Colors.danger}]}>${spend.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Breakdown</Text>
        <View style={styles.cardSmall}>
          <Text style={{fontWeight:'700'}}>Housing</Text>
          <View style={styles.progressBg}><View style={[styles.progressFill,{width:'45%'}]} /></View>
          <Text style={{marginTop:8}}>Food & Dining • Transport</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {(txs || []).slice(0,3).map(t=> <TransactionCard key={t.id} tx={t} />)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor: Colors.background},
  balanceCard:{backgroundColor: Colors.card, padding:20, borderRadius:14, marginBottom:16},
  small:{color:Colors.muted, marginBottom:8},
  balance:{fontSize:36, fontWeight:'900', color: Colors.text},
  rowSplit:{flexDirection:'row', justifyContent:'space-between', marginTop:12},
  moneyCol:{flex:1},
  moneyLabel:{color:Colors.muted},
  moneyValue:{fontSize:18, fontWeight:'800'},
  section:{marginTop:8},
  sectionTitle:{fontSize:18, fontWeight:'700', marginBottom:8, color: Colors.text},
  cardSmall:{backgroundColor:Colors.card, padding:12, borderRadius:12},
  progressBg:{height:8, backgroundColor:'#eef2f7', borderRadius:6, overflow:'hidden', marginTop:8},
  progressFill:{height:8, backgroundColor:Colors.primary}
});
