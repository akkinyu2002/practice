import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../theme';

export default function TransactionCard({ tx }){
  const sign = tx.type === 'income' ? '+' : '-';
  const color = tx.type === 'income' ? Colors.primary : Colors.text;
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.row} onPress={()=>navigation.navigate('TransactionDetails',{ id: tx.id })}>
      <View style={styles.left}>
        <View style={[styles.avatar, tx.type==='income' ? styles.incomeBg : styles.expenseBg]} />
        <View style={{marginLeft:12}}>
          <Text style={styles.title}>{tx.title}</Text>
          <Text style={styles.sub}>{tx.category || ''} • {new Date(tx.date).toLocaleDateString()}</Text>
        </View>
      </View>
      <Text style={[styles.amount,{color}]}>{sign}${tx.amount.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row:{backgroundColor:Colors.card, padding:14, borderRadius:12, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:10, shadowColor:'#000', shadowOpacity:0.03, shadowRadius:6, elevation:2},
  left:{flexDirection:'row', alignItems:'center'},
  avatar:{width:48, height:48, borderRadius:24, backgroundColor:'#e6f4ea'},
  incomeBg:{backgroundColor:'#d1fae5'},
  expenseBg:{backgroundColor:'#eef2ff'},
  title:{fontWeight:'800', fontSize:16, color: Colors.text},
  sub:{color:Colors.muted},
  amount:{fontWeight:'800', fontSize:16}
});
