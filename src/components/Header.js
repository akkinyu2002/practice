import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../theme';

export default function Header({ title }){
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Image source={{uri: 'https://i.pravatar.cc/60'}} style={styles.avatar} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.bell}>
        <Text style={{fontSize:18}}>🔔</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row:{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12},
  left:{flexDirection:'row', alignItems:'center'},
  avatar:{width:40, height:40, borderRadius:20, marginRight:12},
  title:{fontSize:22, fontWeight:'800', color: Colors.text},
  bell:{padding:8}
});
