import { Platform, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { exportTransactionsCSV } from './storage';

export async function saveAndShareCSV(){
  try{
    const csv = await exportTransactionsCSV();
    const filename = `walletwise-transactions-${Date.now()}.csv`;
    const path = FileSystem.cacheDirectory + filename;
    await FileSystem.writeAsStringAsync(path, csv, { encoding: FileSystem.EncodingType.UTF8 });

    if(Platform.OS === 'web'){
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      return { ok: true, uri: url };
    }

    const available = await Sharing.isAvailableAsync();
    if(!available){
      Alert.alert('Export', `CSV saved to:\n${path}`);
      return { ok: true, uri: path };
    }

    await Sharing.shareAsync(path, { mimeType: 'text/csv' });
    return { ok: true, uri: path };
  }catch(e){
    console.warn('saveAndShareCSV error', e);
    Alert.alert('Export failed', e.message || String(e));
    return { ok: false, error: e };
  }
}
